import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, Text } from 'native-base';
import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import ProgressStatus from '../../components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '../../components/Screen';
import { BrandedButton, HeaderText, RegularText } from '../../components/Text';
import UserService from '../../core/user/UserService';
import { AssessmentInfosRequest } from '../../core/user/dto/UserAPIContracts';
import i18n from '../../locale/i18n';
import { ScreenParamList } from '../ScreenParamList';
import { colors } from '../../../theme';
import { chevronRight, pending, tick } from '../../../assets';
import { CovidTest } from '../../core/user/dto/CovidTestContracts';
import CovidTestService from '../../core/user/CovidTestService';
import key from 'weak-key';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'CovidTest'>;
  route: RouteProp<ScreenParamList, 'CovidTest'>;
};

type State = {
  errorMessage: string;
  covidTests: CovidTest[];
};

const initialState: State = {
  errorMessage: '',
  covidTests: [],
};

export default class YourCovidTestsScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  async componentDidMount() {
    const covidTestService = new CovidTestService();
    const tests = await covidTestService.listTests();
    this.setState({ covidTests: tests.data });
  }

  handleAddNewTest = () => {
    const { currentPatient } = this.props.route.params;
    this.props.navigation.navigate('CovidTestDetail', { currentPatient });
  };

  handleEditTest = (test: CovidTest) => {
    const { currentPatient } = this.props.route.params;
    this.props.navigation.navigate('CovidTestDetail', { currentPatient, test });
  };

  handleNextQuestion = () => {
    const { currentPatient, assessmentId } = this.props.route.params;
    const userService = new UserService();
    const patientId = currentPatient.patientId;

    const assessment = {
      patient: patientId,
    } as Partial<AssessmentInfosRequest>;

    if (assessmentId == null) {
      userService
        .addAssessment(assessment)
        .then((response) => {
          this.props.navigation.setParams({ assessmentId: response.data.id });
          this.props.navigation.navigate('HowYouFeel', { currentPatient, assessmentId: response.data.id });
        })
        .catch((err) => {
          this.setState({ errorMessage: i18n.t('something-went-wrong') });
        });
    } else {
      userService
        .updateAssessment(assessmentId, assessment)
        .then((response) => {
          this.props.navigation.navigate('HowYouFeel', { currentPatient, assessmentId });
        })
        .catch((err) => {
          this.setState({ errorMessage: i18n.t('something-went-wrong') });
        });
    }
  };

  render() {
    const currentPatient = this.props.route.params.currentPatient;

    const resultString = (result: string) => {
      switch (result) {
        case 'positive':
          return i18n.t('positive');
        case 'negative':
          return i18n.t('negative');
        default:
          return i18n.t('pending');
      }
    };

    const icon = (result: string) => {
      if (result == 'pending') {
        return pending;
      } else {
        return tick;
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
                  onPress={() => this.handleEditTest(item)}>
                  <Image source={icon(item.result)} style={styles.tick} />
                  <Text>{item.date_taken_specific}</Text>
                  <View style={{ flex: 1 }} />
                  <Text>{resultString(item.result)}</Text>
                  <Image source={chevronRight} style={styles.chevron} />
                </TouchableOpacity>
              );
            })}
          </View>
        </Screen>

        <Button block style={styles.newTestButton} onPress={this.handleAddNewTest}>
          <Text style={styles.newTestText}>{i18n.t('add-new-test')}</Text>
        </Button>

        <BrandedButton style={styles.bottomButton} onPress={this.handleNextQuestion}>
          <Text>{this.state.covidTests.length == 0 ? i18n.t('never-had-test') : i18n.t('above-list-correct')}</Text>
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
});
