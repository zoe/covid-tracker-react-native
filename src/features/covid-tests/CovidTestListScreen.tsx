import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from 'native-base';
import key from 'weak-key';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '@theme';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { ClickableText, HeaderText, RegularText } from '@covid/components/Text';
import { Loading } from '@covid/components/Loading';
import { ICovidTestService } from '@covid/core/user/CovidTestService';
import { CovidTest, CovidTestType } from '@covid/core/user/dto/CovidTestContracts';
import AssessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import i18n from '@covid/locale/i18n';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { lazyInject } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';
import { openWebLink } from '@covid/utils/links';
import { BrandedButton } from '@covid/components';

import { CovidTestRow } from './components/CovidTestRow';

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
        const patientId = AssessmentCoordinator.assessmentData.patientData.patientId;
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
    return AssessmentCoordinator.assessmentData.patientData.patientState.isNHSStudy
      ? CovidTestType.NHSStudy
      : CovidTestType.Generic;
  };

  gotoAddTest = () => {
    const testType = this.getCovidTestType();
    AssessmentCoordinator.goToAddEditTest(testType);
  };

  handleNextButton = async () => {
    AssessmentCoordinator.gotoNextScreen(this.props.route.name);
  };

  render() {
    const currentPatient = AssessmentCoordinator.assessmentData.patientData.patientState;
    const { isLoading } = this.state;
    const isNHSStudy = currentPatient.isNHSStudy;

    return (
      <View style={styles.rootContainer}>
        <Screen profile={currentPatient.profile} navigation={this.props.navigation}>
          <Header>
            <HeaderText>{i18n.t('covid-test-list.title')}</HeaderText>
          </Header>

          <ProgressBlock>
            <ProgressStatus step={0} maxSteps={1} />
          </ProgressBlock>

          {isNHSStudy ? (
            <RegularText style={styles.content}>
              <RegularText>{i18n.t('covid-test-list.nhs-text')}</RegularText>
              <ClickableText onPress={() => openWebLink('https://covid.joinzoe.com/passt')}>
                {i18n.t('covid-test-list.nhs-text-link')}
              </ClickableText>
            </RegularText>
          ) : (
            <View style={styles.content}>
              <RegularText>{i18n.t('covid-test-list.text')}</RegularText>
            </View>
          )}

          <BrandedButton style={styles.newButton} onPress={this.gotoAddTest}>
            <Text style={styles.newText}>{i18n.t('covid-test-list.add-new-test')}</Text>
          </BrandedButton>

          {isLoading ? (
            <Loading status="" error={null} />
          ) : (
            <View style={styles.content}>
              {this.state.covidTests.map((item: CovidTest) => {
                return <CovidTestRow type={item.type} item={item} key={key(item)} />;
              })}
            </View>
          )}

          <View style={{ flex: 1 }} />

          <BrandedButton style={styles.continueButton} onPress={this.handleNextButton}>
            <Text>
              {this.state.covidTests.length === 0
                ? i18n.t('covid-test-list.never-had-test')
                : i18n.t('covid-test-list.above-list-correct')}
            </Text>
          </BrandedButton>
        </Screen>
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
    marginVertical: 16,
    backgroundColor: colors.backgroundTertiary,
  },
  newText: {
    color: colors.primary,
  },
  continueButton: {
    marginHorizontal: 16,
  },
});
