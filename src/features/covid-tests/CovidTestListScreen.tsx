import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from 'native-base';
import key from 'weak-key';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '@theme';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { BrandedButton, HeaderText, RegularText } from '@covid/components/Text';
import { Loading } from '@covid/components/Loading';
import { AssessmentInfosRequest } from '@covid/core/assessment/dto/AssessmentInfosRequest';
import CovidTestService from '@covid/core/user/CovidTestService';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import AssessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import i18n from '@covid/locale/i18n';
import { assessmentService } from '@covid/Services';
import { CovidTestRow } from '@covid/components/CovidTestRow/CovidTestRow';
import { ScreenParamList } from '@covid/features/ScreenParamList';

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
  state: State = {
    errorMessage: '',
    covidTests: [],
    isLoading: false,
  };

  private _unsubscribe: any = null;

  private LoadingIndicator: React.FC = () => <Loading status="" error={null} />;

  async componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      this.setState({ isLoading: true });
      try {
        const covidTestService = new CovidTestService();
        const tests = (await covidTestService.listTests()).data;
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
    const { isLoading } = this.state;

    return (
      <View style={styles.rootContainer}>
        <Screen profile={currentPatient.profile} navigation={this.props.navigation}>
          <Header>
            <HeaderText>{i18n.t('covid-test-list.title')}</HeaderText>
          </Header>

          <ProgressBlock>
            <ProgressStatus step={2} maxSteps={5} />
          </ProgressBlock>

          <View style={styles.content}>
            <RegularText>{i18n.t('covid-test-list.text')}</RegularText>
          </View>

          {isLoading ? (
            <this.LoadingIndicator />
          ) : (
            <View style={styles.content}>
              {this.state.covidTests.map((item: CovidTest) => {
                return <CovidTestRow item={item} key={key(item)} />;
              })}
            </View>
          )}
        </Screen>

        <View>
          <BrandedButton style={styles.newButton} onPress={AssessmentCoordinator.goToAddEditTest}>
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
