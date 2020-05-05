import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import moment from 'moment';
import { Button, ListItem, Text } from 'native-base';
import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import ProgressStatus from '../../components/ProgressStatus';
import Screen, { Header, isAndroid, ProgressBlock } from '../../components/Screen';
import { BrandedButton, HeaderText, RegularText } from '../../components/Text';
import UserService from '../../core/user/UserService';
import { AssessmentInfosRequest } from '../../core/user/dto/UserAPIContracts';
import i18n from '../../locale/i18n';
import { ScreenParamList } from '../ScreenParamList';
import { IOption } from '../patient/YourWorkScreen/helpers';
import { colors, fontStyles } from '../../../theme';
import { inspect } from 'util';
import { chevronRight, menuIcon, pending, tick } from '../../../assets';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'CovidTest'>;
  route: RouteProp<ScreenParamList, 'CovidTest'>;
};

type State = {
  errorMessage: string;
  covidTests: CovidTest[];
};

type CovidTest = {
  key: string;
  date: Date;
  type: string;
  result: string;
};

const now = moment().add(moment().utcOffset(), 'minutes').toDate();

const initialState: State = {
  errorMessage: '',
  covidTests: [
    //todo remove
    { key: '1', date: now, type: 'swab', result: 'pending' },
    { key: '2', date: now, type: 'blood', result: 'negative' },
    { key: '3', date: now, type: 'blood', result: 'negative' },
  ],
};

export default class YourCovidTestsScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount(): void {
    //todo get current tests and update state
  }

  handleAddNewTest() {
    const { currentPatient } = this.props.route.params;
    const patientId = currentPatient.patientId;
    const userService = new UserService();
  }

  handleNextQuestion() {
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
  }

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
            {this.state.covidTests.map((item) => {
              return (
                <TouchableOpacity style={styles.itemTouchable}>
                  <Image source={icon(item.result)} style={styles.tick} />
                  <Text>{item.date.toDateString()}</Text>
                  <View style={{ flex: 1 }} />
                  <Text>{resultString(item.result)}</Text>
                  <Image source={chevronRight} style={styles.chevron} />
                </TouchableOpacity>
              );
            })}
          </View>
        </Screen>

        <Button block style={styles.newTestButton}>
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
