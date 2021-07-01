import { BrandedButton } from '@covid/components';
import { Loading } from '@covid/components/Loading';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { HeaderText, RegularText } from '@covid/components/Text';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { covidTestService } from '@covid/core/user/CovidTestService';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import { Text } from 'native-base';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import key from 'weak-key';

import { CovidTestRow } from './components/CovidTestRow';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'CovidTestList'>;
  route: RouteProp<ScreenParamList, 'CovidTestList'>;
};

type State = {
  covidTests: CovidTest[];
  isLoading: boolean;
};

export default class CovidTestListScreen extends React.Component<Props, State> {
  state: State = {
    covidTests: [],
    isLoading: false,
  };

  private unsubscribe: any = null;

  async componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', async () => {
      this.setState({ isLoading: true });
      try {
        const tests = (await covidTestService.listTests()).data;
        const patientTests = tests.filter(
          (t) => t.patient === assessmentCoordinator.assessmentData?.patientData?.patientId,
        );
        this.setState({ covidTests: patientTests, isLoading: false });
      } finally {
        this.setState({ isLoading: false });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  gotoAddTest = () => {
    assessmentCoordinator.goToAddEditTest();
  };

  handleNextButton = async () => {
    assessmentCoordinator.gotoNextScreen(this.props.route.name);
  };

  render() {
    const currentPatient = assessmentCoordinator.assessmentData?.patientData?.patientState;
    const { isLoading } = this.state;

    return (
      <View style={styles.rootContainer}>
        <Screen navigation={this.props.navigation} profile={currentPatient?.profile} testID="covid-test-list-screen">
          <Header>
            <HeaderText>{i18n.t('covid-test-list.title')}</HeaderText>
          </Header>

          <ProgressBlock>
            <ProgressStatus maxSteps={1} step={0} />
          </ProgressBlock>

          <View style={styles.content}>
            <RegularText>{i18n.t('covid-test-list.text')}</RegularText>
          </View>

          <BrandedButton onPress={this.gotoAddTest} style={styles.newButton} testID="button-add-test">
            <Text style={styles.newText}>{i18n.t('covid-test-list.add-new-test')}</Text>
          </BrandedButton>

          {isLoading ? (
            <Loading error={null} status="" />
          ) : (
            <View style={styles.content}>
              {this.state.covidTests.map((item: CovidTest) => {
                return <CovidTestRow item={item} key={key(item)} />;
              })}
            </View>
          )}

          <View style={{ flex: 1 }} />

          <BrandedButton
            onPress={this.handleNextButton}
            style={styles.continueButton}
            testID="button-covid-test-list-screen"
          >
            <Text style={{ color: colors.white }}>
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
  content: {
    margin: 16,
  },
  continueButton: {
    marginHorizontal: 16,
  },
  newButton: {
    backgroundColor: colors.backgroundTertiary,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  newText: {
    color: colors.primary,
  },
  rootContainer: {
    backgroundColor: colors.backgroundPrimary,
    flex: 1,
  },
});
