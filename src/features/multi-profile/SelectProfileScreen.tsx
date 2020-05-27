import { addProfile, menuIcon, NUMBER_OF_PROFILE_AVATARS, tick } from '@assets';
import { offlineService, userService } from '@covid/Services';
import DaysAgo from '@covid/components/DaysAgo';
import { Loading, LoadingModal } from '@covid/components/Loading';
import { Header } from '@covid/components/Screen';
import { ClippedText, HeaderText, RegularText, SecondaryText } from '@covid/components/Text';
import { ApiErrorState, initialErrorState } from '@covid/core/api/ApiServiceErrors';
import i18n from '@covid/locale/i18n';
import { AvatarName, getAvatarByName } from '@covid/utils/avatar';
import { getDaysAgo } from '@covid/utils/datetime';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';
import { colors } from '@theme';
import { Card } from 'native-base';
import React, { Component } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import key from 'weak-key';

import Navigator from '../Navigation';
import { ScreenParamList } from '../ScreenParamList';

type RenderProps = {
  navigation: DrawerNavigationProp<ScreenParamList, 'SelectProfile'>;
  route: RouteProp<ScreenParamList, 'SelectProfile'>;
};

type Patient = {
  id: string;
  name?: string;
  avatar_name?: string;
  reported_by_another?: boolean;
  report_count?: number;
  last_reported_at?: Date;
  created_at?: Date;
};

type PatientListState = {
  isLoaded: boolean;
  patients: Patient[];
  shouldRefresh: boolean;
};

type State = PatientListState & ApiErrorState;

const initialState = {
  ...initialErrorState,
  patients: [],
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
          patients: response.data,
          isLoaded: true,
        });
    } catch (error) {
      this.setState({ error });
    }
  }

  async profileSelected(patientId: string, index: number) {
    try {
      const currentPatient = await userService.getCurrentPatient(patientId);
      this.setState({ isApiError: false });
      await Navigator.profileSelected(index == 0, currentPatient);
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
            this.profileSelected(patientId, index);
          }, offlineService.getRetryDelay());
        },
      });
    }
  }

  getNextAvatarName() {
    if (this.state.patients) {
      const n = (this.state.patients.length + 1) % NUMBER_OF_PROFILE_AVATARS;
      return 'profile' + n.toString();
    } else {
      return 'profile1';
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
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.toggleDrawer();
                }}>
                <Image source={menuIcon} style={styles.menuIcon} />
              </TouchableOpacity>

              <Header>
                <HeaderText style={{ marginBottom: 12 }}>{i18n.t('select-profile-title')}</HeaderText>
                <SecondaryText>{i18n.t('select-profile-text')}</SecondaryText>
              </Header>

              {this.state.isLoaded ? (
                <View style={styles.profileList}>
                  {this.state.patients.map((patient, i) => {
                    const avatarImage = getAvatarByName((patient.avatar_name ?? 'profile1') as AvatarName);
                    const hasReportedToday = patient.last_reported_at && getDaysAgo(patient.last_reported_at) === 0;
                    return (
                      <View style={styles.cardContainer} key={key(patient)}>
                        <TouchableOpacity onPress={() => this.profileSelected(patient.id, i)}>
                          <Card style={styles.card}>
                            <View style={styles.avatarContainer}>
                              {hasReportedToday && (
                                <View style={styles.circle}>
                                  <Image source={tick} style={styles.tick} />
                                </View>
                              )}
                              <Image source={avatarImage} style={styles.avatar} resizeMode="contain" />
                            </View>
                            <ClippedText>{patient.name}</ClippedText>
                            <DaysAgo timeAgo={patient.last_reported_at} />
                          </Card>
                        </TouchableOpacity>
                      </View>
                    );
                  })}

                  <TouchableOpacity style={styles.cardContainer} key="new" onPress={() => this.gotoCreateProfile()}>
                    <Card style={styles.card}>
                      <Image source={addProfile} style={styles.addImage} resizeMode="contain" />
                      <RegularText>{i18n.t('select-profile-button')}</RegularText>
                    </Card>
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

  avatarContainer: {
    alignItems: 'center',
    width: 100,
    marginBottom: 10,
  },

  avatar: {
    height: 100,
    width: 100,
  },

  tick: {
    height: 30,
    width: 30,
  },

  circle: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    top: 0,
    right: -5,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'white',
  },

  addImage: {
    width: '100%',
    height: 100,
    marginBottom: 10,
  },

  card: {
    width: '100%',
    borderRadius: 16,
    minHeight: 200,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: 'center',
  },

  view: {
    backgroundColor: colors.backgroundSecondary,
  },

  scrollView: {
    flexGrow: 1,
    backgroundColor: colors.backgroundSecondary,
    justifyContent: 'space-between',
  },

  content: {
    justifyContent: 'space-between',
    marginVertical: 32,
    marginHorizontal: 18,
  },

  rootContainer: {
    padding: 10,
  },

  shareContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  menuIcon: {
    height: 20,
    width: 20,
    tintColor: colors.primary,
    alignSelf: 'flex-end',
    marginRight: 15,
    marginTop: 10,
  },
});
