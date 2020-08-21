import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from 'native-base';
import key from 'weak-key';
import React, { Component } from 'react';
import { Linking, StyleSheet, View } from 'react-native';

import { colors } from '@theme';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { BrandedButton, ClickableText, HeaderText, RegularText } from '@covid/components/Text';
import { Loading } from '@covid/components/Loading';
import { AssessmentInfosRequest } from '@covid/core/assessment/dto/AssessmentInfosRequest';
import { ICovidTestService } from '@covid/core/user/CovidTestService';
import { CovidTest, CovidTestType } from '@covid/core/user/dto/CovidTestContracts';
import AssessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import i18n from '@covid/locale/i18n';
import { assessmentService } from '@covid/Services';
import { CovidTestRow } from '@covid/components/CovidTestRow/CovidTestRow';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { lazyInject } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'CovidTestList'>;
  route: RouteProp<ScreenParamList, 'CovidTestList'>;
};

type State = {
  errorMessage: string;
  covidTests: CovidTest[];
  isLoading: boolean;
};

export default class CovidTestListScreen extends Component<Props, State> {
  @lazyInject(Services.CovidTest)
  private readonly covidTestService: ICovidTestService;

  state: State = {
    errorMessage: '',
    covidTests: [],
    isLoading: false,
  };

  private _unsubscribe: any = null;

  async componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      this.setState({ isLoading: true });
      try {
        const tests = (await this.covidTestService.listTests()).data;
        const patientId = AssessmentCoordinator.assessmentData.currentPatient.patientId;
        const patientTests = tests.filter((t) => t.patient === patientId);
        this.setState({ covidTests: patientTests, isLoading: false });
      } finally {
        this.setState({ isLoading: false });
      }
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  getCovidTestType = (): CovidTestType => {
    return AssessmentCoordinator.assessmentData.currentPatient.isNHSStudy
      ? CovidTestType.NHSStudy
      : CovidTestType.Generic;
  };

  gotoAddTest = () => {
    const testType = this.getCovidTestType();
    AssessmentCoordinator.goToAddEditTest(testType);
  };

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

  openUrl = (link: string) => {
    Linking.openURL(link);
  };

  render() {
    const currentPatient = AssessmentCoordinator.assessmentData.currentPatient;
    const { isLoading } = this.state;
    const isNHSStudy = currentPatient.isNHSStudy;

    return (
      <View style={styles.rootContainer}>
        <Screen profile={currentPatient.profile} navigation={this.props.navigation}>
          <Header>
            <HeaderText>{i18n.t('covid-test-list.title')}</HeaderText>
          </Header>

          <ProgressBlock>
            <ProgressStatus step={2} maxSteps={5} />
          </ProgressBlock>

          {isNHSStudy ? (
            <RegularText style={styles.content}>
              <RegularText>{i18n.t('covid-test-list.nhs-text')}</RegularText>
              <ClickableText onPress={() => this.openUrl('https://covid.joinzoe.com/passt')}>
                {i18n.t('covid-test-list.nhs-text-link')}
              </ClickableText>
            </RegularText>
          ) : (
            <View style={styles.content}>
              <RegularText>{i18n.t('covid-test-list.text')}</RegularText>
            </View>
          )}

          {isLoading ? (
            <Loading status="" error={null} />
          ) : (
            <View style={styles.content}>
              {this.state.covidTests.map((item: CovidTest) => {
                return <CovidTestRow type={item.type} item={item} key={key(item)} />;
              })}
            </View>
          )}
        </Screen>

        <View>
          <BrandedButton style={styles.newButton} onPress={this.gotoAddTest}>
            <Text style={styles.newText}>{i18n.t('covid-test-list.add-new-test')}</Text>
          </BrandedButton>

          <BrandedButton style={styles.continueButton} onPress={this.handleNextQuestion}>
            <Text>
              {this.state.covidTests.length === 0
                ? i18n.t('covid-test-list.never-had-test')
                : i18n.t('covid-test-list.above-list-correct')}
            </Text>
          </BrandedButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  content: {
    margin: 16,
  },
  newButton: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  newText: {
    color: colors.primary,
  },
  continueButton: {
    marginHorizontal: 16,
    marginBottom: 32,
  },
});
