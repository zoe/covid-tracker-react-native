import { CommonActions, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Body, CheckBox, Item, ListItem } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { colors } from '../../../theme';
import Screen, { Header, screenWidth } from '../../components/Screen';
import { BrandedButton, ClickableText, ErrorText, HeaderText, RegularText, SecondaryText } from '../../components/Text';
import UserService from '../../core/user/UserService';
import { PatientInfosRequest } from '../../core/user/dto/UserAPIContracts';
import i18n from '../../locale/i18n';
import Navigator from '../Navigation';
import { ConsentType, ScreenParamList } from '../ScreenParamList';

type RenderProps = {
  navigation: StackNavigationProp<ScreenParamList, 'ConsentForOther'>;
  route: RouteProp<ScreenParamList, 'ConsentForOther'>;
};

interface ConsentState {
  consentChecked: boolean;
  errorMessage: string;
}

export default class ConsentForOtherScreen extends Component<RenderProps, ConsentState> {
  constructor(props: RenderProps) {
    super(props);
    this.state = {
      consentChecked: false,
      errorMessage: '',
    };
    this.createProfile = this.createProfile.bind(this);
  }

  handleConsentClick = () => {
    this.setState({ consentChecked: !this.state.consentChecked });
  };

  isAdultConsent = () => {
    return this.props.route.params.consentType == ConsentType.Adult;
  };

  headerText = this.isAdultConsent() ? i18n.t('adult-consent-title') : i18n.t('child-consent-title');
  secondaryText = this.isAdultConsent() ? (
    <RegularText>
      {i18n.t('adult-consent-text-1')}{' '}
      <ClickableText onPress={() => this.props.navigation.navigate('Consent', { viewOnly: true })}>
        {i18n.t('consent')}
      </ClickableText>{' '}
      {i18n.t('adult-consent-text-2')}
    </RegularText>
  ) : (
    <RegularText>
      {i18n.t('child-consent-text-1')}{' '}
      <ClickableText onPress={() => this.props.navigation.navigate('Consent', { viewOnly: true })}>
        {i18n.t('consent')}
      </ClickableText>{' '}
      {i18n.t('child-consent-text-2')}
    </RegularText>
  );
  consentLabel = this.isAdultConsent() ? i18n.t('adult-consent-confirm') : i18n.t('child-consent-confirm');

  async startAssessment(patientId: string) {
    const userService = new UserService();
    const currentPatient = await userService.getCurrentPatient(patientId);
    Navigator.resetToProfileStartAssessment(currentPatient);
  }

  createProfile() {
    const name = this.props.route.params.profileName;
    const avatarName = this.props.route.params.avatarName;
    const userService = new UserService();

    const newPatient = {
      name,
      avatar_name: avatarName,
      reported_by_another: true,
    } as Partial<PatientInfosRequest>;

    userService
      .createPatient(newPatient)
      .then((response) => {
        this.startAssessment(response.data.id);
      })
      .catch((err) => this.setState({ errorMessage: i18n.t('something-went-wrong') }));
  }

  render() {
    return (
      <Screen>
        <Header>
          <HeaderText style={{ marginBottom: 12 }}>{this.headerText}</HeaderText>
          {this.secondaryText}
        </Header>

        <ListItem>
          <CheckBox checked={this.state.consentChecked} onPress={this.handleConsentClick} />
          <TouchableWithoutFeedback onPress={this.handleConsentClick}>
            <Body style={styles.label}>
              <RegularText>{this.consentLabel}</RegularText>
            </Body>
          </TouchableWithoutFeedback>
        </ListItem>

        <ErrorText>{this.state.errorMessage}</ErrorText>

        <BrandedButton enable={this.state.consentChecked} hideLoading onPress={this.createProfile}>
          {i18n.t('consent-create-profile')}
        </BrandedButton>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    marginLeft: 10,
  },

  fieldRow: {
    flexDirection: 'row',
  },

  primaryField: {
    flex: 3,
  },

  secondaryField: {
    flex: 1,
  },

  picker: {
    width: screenWidth - 16,
    marginTop: 16,
  },

  smallPicker: {
    // width: 40,
  },

  textarea: {
    width: '100%',
  },

  button: {
    borderRadius: 8,
    height: 56,
    backgroundColor: colors.brand,
  },
  buttonText: {
    color: colors.white,
  },
});
