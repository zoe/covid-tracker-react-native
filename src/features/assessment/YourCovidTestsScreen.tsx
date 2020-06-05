import { chevronRight, pending, tick } from '@assets';
import { assessmentService } from '@covid/Services';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { BrandedButton, HeaderText, RegularText } from '@covid/components/Text';
import { AssessmentInfosRequest } from '@covid/core/assessment/dto/AssessmentInfosRequest';
import CovidTestService from '@covid/core/user/CovidTestService';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import AssessmentCoordinator from '@covid/features/assessment/AssessmentCoordinator';
import i18n, { getDayName, getMonthName } from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import moment from 'moment';
import { Button, Text } from 'native-base';
import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import key from 'weak-key';

import { ScreenParamList } from '../ScreenParamList';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'CovidTest'>;
  route: RouteProp<ScreenParamList, 'CovidTest'>;
};

type State = {
  errorMessage: string;
  covidTests: CovidTest[];
};

export default class YourCovidTestsScreen extends Component<Props, State> {
  state: State = {
    errorMessage: '',
    covidTests: [],
  };

  private _unsubscribe: any = null;

  async componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      const covidTestService = new CovidTestService();
      const tests = (await covidTestService.listTests()).data;
      const patientId = AssessmentCoordinator.assessmentData.currentPatient.patientId;
      const patientTests = tests.filter((t) => t.patient === patientId);
      this.setState({ covidTests: patientTests });
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  handleNextQuestion = async () => {
    try {
      const { currentPatient, assessmentId } = AssessmentCoordinator.assessmentData;
      const patientId = currentPatient.patientId;

      const assessment = {
        patient: patientId,
      } as Partial<AssessmentInfosRequest>;

      const response = await assessmentService.saveAssessment(assessmentId ?? null, assessment);
      if (!assessmentId) {
        AssessmentCoordinator.assessmentData.assessmentId = response.id;
      }
      AssessmentCoordinator.gotoNextScreen(this.props.route.name);
    } catch (error) {
      this.setState({ errorMessage: i18n.t('something-went-wrong') });
    }
  };

  render() {
    const currentPatient = AssessmentCoordinator.assessmentData.currentPatient;

    const resultString = (result: string) => {
      switch (result) {
        case 'positive':
          return i18n.t('positive');
        case 'negative':
          return i18n.t('negative');
        case 'failed':
          return i18n.t('failed');
        default:
          return i18n.t('pending');
      }
    };

    const icon = (result: string) => {
      if (result === 'waiting') {
        return pending;
      } else {
        return tick;
      }
    };

    const dateString = (test: CovidTest) => {
      if (test.date_taken_specific) {
        const date = moment(test.date_taken_specific).toDate();
        return `${getMonthName(date)} ${date.getDate()} (${getDayName(date)})`;
      } else {
        const stateDate = moment(test.date_taken_between_start).toDate();
        const endDate = moment(test.date_taken_between_end).toDate();
        return `${getMonthName(stateDate)} ${stateDate.getDate()} - ${getMonthName(endDate)} ${endDate.getDate()}`;
      }
    };

    return (
      <View style={styles.rootContainer}>
        <Screen profile={currentPatient.profile} navigation={this.props.navigation}>
          <Header>
            <HeaderText>{i18n.t('your-covid-tests')}</HeaderText>
          </Header>
          <RegularText style={styles.topText}>{i18n.t('please-add-test-below')}</RegularText>

          <ProgressBlock>
            <ProgressStatus step={2} maxSteps={5} />
          </ProgressBlock>

          <View style={styles.list}>
            {this.state.covidTests.map((item: CovidTest) => {
              return (
                <TouchableOpacity
                  key={key(item)}
                  style={styles.itemTouchable}
                  onPress={() => AssessmentCoordinator.goToAddEditTest(item)}>
                  <Image source={icon(item.result)} style={styles.tick} />
                  <RegularText style={item.result === 'waiting' ? styles.pendingText : []}>
                    {dateString(item)}
                  </RegularText>
                  <View style={{ flex: 1 }} />
                  <RegularText style={item.result === 'waiting' ? styles.pendingText : []}>
                    {resultString(item.result)}
                  </RegularText>
                  <Image source={chevronRight} style={styles.chevron} />
                </TouchableOpacity>
              );
            })}
          </View>
        </Screen>

        <Button block style={styles.newTestButton} onPress={AssessmentCoordinator.goToAddEditTest}>
          <Text style={styles.newTestText}>{i18n.t('add-new-test')}</Text>
        </Button>

        <BrandedButton style={styles.bottomButton} onPress={this.handleNextQuestion}>
          <Text>{this.state.covidTests.length === 0 ? i18n.t('never-had-test') : i18n.t('above-list-correct')}</Text>
        </BrandedButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  bottomButton: {
    margin: 16,
    marginBottom: 32,
  },
  newTestButton: {
    marginHorizontal: 16,
    marginBottom: 16,
    alignItems: 'center',
    borderRadius: 100,
    height: 56,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    elevation: 0,
  },
  newTestText: {
    fontSize: 16,
    color: colors.primary,
  },
  itemTouchable: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  list: {
    margin: 16,
  },
  tick: {
    marginEnd: 8,
    height: 16,
    width: 16,
  },
  chevron: {
    marginStart: 4,
    height: 12,
    width: 12,
  },
  topText: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  pendingText: {
    color: colors.secondary,
  },
});
