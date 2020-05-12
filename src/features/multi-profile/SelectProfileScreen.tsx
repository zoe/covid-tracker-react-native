import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Card } from 'native-base';
import React, { Component } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import key from 'weak-key';

import { addProfile, menuIcon, NUMBER_OF_PROFILE_AVATARS } from '../../../assets';
import { colors } from '../../../theme';
import DaysAgo from '../../components/DaysAgo';
import { Header } from '../../components/Screen';
import { ClippedText, ErrorText, HeaderText, RegularText, SecondaryText } from '../../components/Text';
import UserService from '../../core/user/UserService';
import i18n from '../../locale/i18n';
import { AvatarName, getAvatarByName } from '../../utils/avatar';
import { ScreenParamList } from '../ScreenParamList';

type RenderProps = {
  navigation: DrawerNavigationProp<ScreenParamList, 'SelectProfile'>;
  route: RouteProp<ScreenParamList, 'SelectProfile'>;
};

export type Patient = {
  id: string;
  name?: string;
  avatar_name?: string;
  reported_by_another?: boolean;
  report_count?: number;
  last_reported_at?: Date;
  created_at?: Date;
};

interface State {
  patients: Patient[];
  errorMessage: string;
  shouldRefresh: boolean;
}

export default class SelectProfileScreen extends Component<RenderProps, State> {
  constructor(props: RenderProps) {
    super(props);
    this.state = {
      patients: [],
      errorMessage: '',
      shouldRefresh: false,
    };
  }

  async componentDidMount() {
    this.props.navigation.addListener('focus', async (e) => {
      if (this.state.shouldRefresh) {
        await this.listProfiles();
      }
    });

    await this.listProfiles();
    this.setState({ shouldRefresh: true });
  }

  async listProfiles() {
    const userService = new UserService();
    try {
      const response = await userService.listPatients();
      this.setState({ patients: response.data });
    } catch (err) {
      this.setState({ errorMessage: i18n.t('something-went-wrong') });
    }
  }

  async startAssessment(patientId: string) {
    const userService = new UserService();
    const currentPatient = await userService.getCurrentPatient(patientId);
    this.props.navigation.navigate('StartAssessment', { currentPatient });
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

              <ErrorText>{this.state.errorMessage}</ErrorText>

              <View style={styles.profileList}>
                {this.state.patients.map((patient, i) => {
                  const avatarImage = getAvatarByName((patient.avatar_name ?? 'profile1') as AvatarName);
                  return (
                    <View style={styles.cardContainer} key={key(patient)}>
                      <TouchableOpacity onPress={() => this.startAssessment(patient.id)}>
                        <Card style={styles.card}>
                          <Image source={avatarImage} style={styles.avatar} resizeMode="contain" />
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

  avatar: {
    width: '80%',
    height: 100,
    marginBottom: 10,
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
