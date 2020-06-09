import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';
import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { NUMBER_OF_PROFILE_AVATARS } from '@assets';
import { colors } from '@theme';
import { Loading, LoadingModal } from '@covid/components/Loading';
import { Header } from '@covid/components/Screen';
import { HeaderText, SecondaryText } from '@covid/components/Text';
import { ApiErrorState, initialErrorState } from '@covid/core/api/ApiServiceErrors';
import i18n from '@covid/locale/i18n';
import { offlineService, userService } from '@covid/Services';
import { DrawerToggle } from '@covid/components/DrawerToggle';
import { ProfileCard } from '@covid/components/ProfileCard';
import { NewProfileCard } from '@covid/components/NewProfileCard';

import { ScreenParamList } from '../ScreenParamList';
import Navigator from '../Navigation';
import { DEFAULT_PROFILE } from '@covid/utils/avatar';

type RenderProps = {
  navigation: DrawerNavigationProp<ScreenParamList, 'SelectProfile'>;
  route: RouteProp<ScreenParamList, 'SelectProfile'>;
};

export type Profile = {
  id: string;
  name?: string;
  avatar_name?: string;
  reported_by_another?: boolean;
  report_count?: number;
  last_reported_at?: Date;
  created_at?: Date;
};

type ProfileListState = {
  isLoaded: boolean;
  profiles: Profile[];
  shouldRefresh: boolean;
};

type State = ProfileListState & ApiErrorState;

const initialState = {
  ...initialErrorState,
  profiles: [],
  isLoaded: false,
  shouldRefresh: false,
};

export default class SelectProfileScreen extends Component<RenderProps, State> {
  constructor(props: RenderProps) {
    super(props);
    this.state = initialState;
  }

  async componentDidMount() {
    this.props.navigation.addListener('focus', async () => {
      if (this.state.shouldRefresh) {
        await this.listProfiles();
      }
    });

    await this.listProfiles();
    this.setState({ shouldRefresh: true });
  }

  private retryListProfiles() {
    this.setState({ status: i18n.t('errors.status-retrying'), error: null });
    setTimeout(() => this.listProfiles(), offlineService.getRetryDelay());
  }

  async listProfiles() {
    this.setState({ status: i18n.t('errors.status-loading'), error: null });
    try {
      const response = await userService.listPatients();
      response &&
        this.setState({
          profiles: response.data,
          isLoaded: true,
        });
    } catch (error) {
      this.setState({ error });
    }
  }

  async profileSelected(profileId: string, index: number) {
    try {
      const currentPatient = await userService.getCurrentPatient(profileId);
      this.setState({ isApiError: false });
      await Navigator.profileSelected(index === 0, currentPatient);
    } catch (error) {
      this.setState({
        isApiError: true,
        error,
        onRetry: () => {
          this.setState({
            status: i18n.t('errors.status-retrying'),
            error: null,
          });
          setTimeout(() => {
            this.setState({ status: i18n.t('errors.status-loading') });
            this.profileSelected(profileId, index);
          }, offlineService.getRetryDelay());
        },
      });
    }
  }

  getNextAvatarName() {
    if (this.state.profiles) {
      const n = (this.state.profiles.length + 1) % NUMBER_OF_PROFILE_AVATARS;
      return 'profile' + n.toString();
    } else {
      return DEFAULT_PROFILE;
    }
  }

  gotoCreateProfile() {
    this.props.navigation.navigate('CreateProfile', { avatarName: this.getNextAvatarName() });
  }

  render() {
    return (
      <View style={styles.view}>
        <SafeAreaView>
          {this.state.isApiError && (
            <LoadingModal
              error={this.state.error}
              status={this.state.status}
              onRetry={this.state.onRetry}
              onPress={() => this.setState({ isApiError: false })}
            />
          )}
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.rootContainer}>
              <DrawerToggle navigation={this.props.navigation} style={{ tintColor: colors.primary }} />

              <Header>
                <HeaderText style={{ marginBottom: 12 }}>{i18n.t('select-profile-title')}</HeaderText>
                <SecondaryText>{i18n.t('select-profile-text')}</SecondaryText>
              </Header>

              {this.state.isLoaded ? (
                <View style={styles.profileList}>
                  {this.state.profiles.map((profile, i) => {
                    return (
                      <View style={styles.cardContainer} key={profile.id}>
                        <TouchableOpacity onPress={() => this.profileSelected(profile.id, i)}>
                          <ProfileCard profile={profile} index={i} />
                        </TouchableOpacity>
                      </View>
                    );
                  })}

                  <TouchableOpacity style={styles.cardContainer} key="new" onPress={() => this.gotoCreateProfile()}>
                    <NewProfileCard />
                  </TouchableOpacity>
                </View>
              ) : (
                <Loading
                  status={this.state.status}
                  error={this.state.error}
                  style={{ borderColor: 'green', borderWidth: 1 }}
                  onRetry={() => this.retryListProfiles()}
                />
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  profileList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    width: '100%',
    alignContent: 'stretch',
  },

  cardContainer: {
    width: '45%',
    margin: 5,
  },

  view: {
    backgroundColor: colors.backgroundSecondary,
  },

  scrollView: {
    flexGrow: 1,
    backgroundColor: colors.backgroundSecondary,
    justifyContent: 'space-between',
  },

  rootContainer: {
    padding: 10,
  },
});
