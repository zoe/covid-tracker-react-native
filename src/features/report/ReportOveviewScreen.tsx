import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenParamList } from '../ScreenParamList';
import { RouteProp } from '@react-navigation/native';
import { UserReportCard } from '../../components/list-items/UserReportCard';
import UserService from '../../core/user/UserService';
import { Patient } from '../multi-profile/SelectProfileScreen';
import { StackNavigationProp } from '@react-navigation/stack';
import { BackButton } from '../../components/buttons/Back';
import i18n from '../../locale/i18n';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'ReportOverview'>;
  route: RouteProp<ScreenParamList, 'ReportOverview'>;
};

type State = {
  patients: Patient[];
};

export class ReportOverviewScreen extends Component<Props, State> {
  private userService: UserService = new UserService();

  state = {
    patients: [],
  };

  async componentDidMount() {
    try {
      const response = await this.userService.listPatients();
      if (!response || !response.data) {
        return;
      }
      this.setState({
        patients: response.data,
      });
    } catch (e) {
      this.showApiError(e);
    }
  }

  private showApiError(e: Error) {
    Alert.alert(
      i18n.t('fetch-report-overview-error.title'),
      i18n.t('fetch-report-overview-error.message') + ': ' + e.message,
      [
        {
          text: i18n.t('fetch-report-overview-error.secondary-action-title'),
          style: 'cancel',
        },
        { text: i18n.t('fetch-report-overview-error.primary-action-title') },
      ],
      { cancelable: false }
    );
  }

  render() {
    return (
      <SafeAreaView>
        <View style={styles.root}>
          <BackButton
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />
          <FlatList
            data={this.state.patients}
            contentContainerStyle={styles.listContent}
            style={styles.list}
            renderItem={(item) => {
              return (
                <UserReportCard
                  patient={item.item}
                  alert={true}
                  handleReportNow={() => {
                    this.props.navigation.navigate('StartAssessment', { currentPatient: item.item });
                  }}
                />
              );
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  root: {},
  list: {
    marginTop: 16,
    paddingHorizontal: 24,
  },
  listContent: {
    paddingBottom: 48,
  },
});
