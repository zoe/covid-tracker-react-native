import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ListItem } from 'native-base';
import React, { Component } from 'react';

import { CheckboxItem } from '@covid/components/Checkbox';
import { LoadingModal } from '@covid/components/Loading';
import Screen, { Header } from '@covid/components/Screen';
import { BrandedButton, ClickableText, ErrorText, HeaderText, RegularText } from '@covid/components/Text';
import { ApiErrorState, initialErrorState } from '@covid/core/api/ApiServiceErrors';
import { ICoreService } from '@covid/core/user/UserService';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import i18n from '@covid/locale/i18n';
import { offlineService } from '@covid/Services';
import { lazyInject } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';

import appCoordinator from '../AppCoordinator';
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
  @lazyInject(Services.User)
  private userService: ICoreService;

  constructor(props: RenderProps) {
    super(props);
    this.state = initialState;
    this.createProfile = this.createProfile.bind(this);
  }

  handleConsentClick = (checked: boolean) => {
    this.setState({ consentChecked: checked });
  };

  isAdultConsent = () => {
    return this.props.route.params.consentType === ConsentType.Adult;
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

  async createProfile(): Promise<string> {
    const name = this.props.route.params.profileName;
    const avatarName = this.props.route.params.avatarName;

    const newPatient = {
      name,
      avatar_name: avatarName,
      reported_by_another: true,
    } as Partial<PatientInfosRequest>;

    const response = await this.userService.createPatient(newPatient);
    return response.data.id;
  }

  handleCreateProfile = async () => {
    try {
      const patientId = await this.createProfile();
      await appCoordinator.setPatientId(patientId);
      appCoordinator.resetToProfileStartAssessment();
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
