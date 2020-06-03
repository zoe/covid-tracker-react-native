import { userService, offlineService } from '@covid/Services';
import { CheckboxItem } from '@covid/components/Checkbox';
import { LoadingModal } from '@covid/components/Loading';
import Screen, { Header, screenWidth } from '@covid/components/Screen';
import { BrandedButton, ClickableText, ErrorText, HeaderText, RegularText } from '@covid/components/Text';
import { initialErrorState, ApiErrorState } from '@covid/core/api/ApiServiceErrors';
import UserService from '@covid/core/user/UserService';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import AssessmentCoordinator from '@covid/features/assessment/AssessmentCoordinator';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import { ListItem } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import Navigator from '../Navigation';
import { ConsentType, ScreenParamList } from '../ScreenParamList';

type RenderProps = {
  navigation: StackNavigationProp<ScreenParamList, 'ConsentForOther'>;
  route: RouteProp<ScreenParamList, 'ConsentForOther'>;
};

type ConsentState = {
  consentChecked: boolean;
  errorMessage: string;
} & ApiErrorState;

const initialState: ConsentState = {
  ...initialErrorState,
  consentChecked: false,
  errorMessage: '',
};

export default class ConsentForOtherScreen extends Component<RenderProps, ConsentState> {
  constructor(props: RenderProps) {
    super(props);
    this.state = initialState;
    this.createProfile = this.createProfile.bind(this);
  }

  handleConsentClick = (checked: boolean) => {
    this.setState({ consentChecked: checked });
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

  async createProfile(): Promise<string> {
    const name = this.props.route.params.profileName;
    const avatarName = this.props.route.params.avatarName;

    const newPatient = {
      name,
      avatar_name: avatarName,
      reported_by_another: true,
    } as Partial<PatientInfosRequest>;

    const response = await userService.createPatient(newPatient);
    const patientId = response.data.id;
    return patientId;
  }

  handleCreateProfile = async () => {
    try {
      const patientId = await this.createProfile();
      await this.startAssessment(patientId);
    } catch (error) {
      this.setState({ errorMessage: i18n.t('something-went-wrong') });
      this.setState({
        isApiError: true,
        error,
        onRetry: () => {
          this.setState({
            status: i18n.t('errors.status-retrying'),
            error: null,
          });
          setTimeout(() => {
            this.setState({ status: i18n.t('errors.status-loading') });
            this.handleCreateProfile();
          }, offlineService.getRetryDelay());
        },
      });
    }
  };

  render() {
    return (
      <Screen>
        {this.state.isApiError && (
          <LoadingModal
            error={this.state.error}
            status={this.state.status}
            onRetry={this.state.onRetry}
            onPress={() => this.setState({ isApiError: false })}
          />
        )}
        <Header>
          <HeaderText style={{ marginBottom: 12 }}>{this.headerText}</HeaderText>
          {this.secondaryText}
        </Header>

        <ListItem>
          <CheckboxItem value={this.state.consentChecked} onChange={this.handleConsentClick}>
            {this.consentLabel}
          </CheckboxItem>
        </ListItem>

        <ErrorText>{this.state.errorMessage}</ErrorText>

        <BrandedButton enable={this.state.consentChecked} hideLoading onPress={this.handleCreateProfile}>
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
