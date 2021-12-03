import { BrandedButton } from '@covid/components';
import { CheckboxItem } from '@covid/components/Checkbox';
import { LoadingModal } from '@covid/components/Loading';
import { Screen } from '@covid/components/Screen';
import { ClickableText, ErrorText, HeaderText, RegularText } from '@covid/components/Text';
import { initialErrorState, TApiErrorState } from '@covid/core/api/ApiServiceErrors';
import { patientService } from '@covid/core/patient/PatientService';
import { TPatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import { appCoordinator } from '@covid/features/AppCoordinator';
import i18n from '@covid/locale/i18n';
import { EConsentType, TScreenParamList } from '@covid/routes/types';
import { offlineService } from '@covid/services';
import { styling } from '@covid/themes';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { View } from 'react-native';

type TProps = {
  navigation: StackNavigationProp<TScreenParamList, 'ConsentForOther'>;
  route: RouteProp<TScreenParamList, 'ConsentForOther'>;
};

type TState = {
  consentChecked: boolean;
  errorMessage: string;
} & TApiErrorState;

const initialState: TState = {
  ...initialErrorState,
  consentChecked: false,
  errorMessage: '',
};

export default class ConsentForOtherScreen extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = initialState;
  }

  handleConsentClick = (checked: boolean) => {
    this.setState({ consentChecked: checked });
  };

  isAdultConsent = () => {
    return this.props.route.params?.consentType === EConsentType.Adult;
  };

  headerText = this.isAdultConsent() ? i18n.t('adult-consent-title') : i18n.t('child-consent-title');

  consentLabel = this.isAdultConsent() ? i18n.t('adult-consent-confirm') : i18n.t('child-consent-confirm');

  createPatient = async (): Promise<string> => {
    const newPatient = {
      avatar_name: this.props.route.params?.avatarName,
      name: this.props.route.params?.profileName,
      reported_by_another: true,
    } as Partial<TPatientInfosRequest>;

    const response = await patientService.createPatient(newPatient);
    return response.id;
  };

  handleCreatePatient = async () => {
    try {
      const patientId = await this.createPatient();
      await appCoordinator.setPatientById(patientId);
      appCoordinator.resetToProfileStartAssessment();
    } catch (error) {
      this.setState({ errorMessage: i18n.t('something-went-wrong') });
      this.setState({
        error,
        isApiError: true,
        onRetry: () => {
          this.setState({
            error: null,
            status: i18n.t('errors.status-retrying'),
          });
          setTimeout(() => {
            this.setState({ status: i18n.t('errors.status-loading') });
            this.handleCreatePatient();
          }, offlineService.getRetryDelay());
        },
      });
    }
  };

  render() {
    return (
      <Screen testID="consent-for-other-screen">
        {this.state.isApiError ? (
          <LoadingModal
            error={this.state.error}
            onPress={() => this.setState({ isApiError: false })}
            onRetry={this.state.onRetry}
            status={this.state.status}
          />
        ) : null}
        <HeaderText style={styling.marginBottom}>{this.headerText}</HeaderText>

        {this.isAdultConsent() ? (
          <RegularText style={styling.marginBottom}>
            {i18n.t('adult-consent-text-1')}{' '}
            <ClickableText onPress={() => this.props.navigation.navigate('Consent', { viewOnly: true })}>
              {i18n.t('consent')}
            </ClickableText>{' '}
            {i18n.t('adult-consent-text-2')}
          </RegularText>
        ) : (
          <RegularText style={styling.marginBottom}>
            {i18n.t('child-consent-text-1')}{' '}
            <ClickableText onPress={() => this.props.navigation.navigate('Consent', { viewOnly: true })}>
              {i18n.t('consent-summary')}
            </ClickableText>{' '}
            {i18n.t('child-consent-text-2')}
          </RegularText>
        )}

        <CheckboxItem
          onChange={this.handleConsentClick}
          style={styling.marginBottomHuge}
          testID="checkbox-consent"
          value={this.state.consentChecked}
        >
          {this.consentLabel}
        </CheckboxItem>

        <View style={styling.marginTopAuto}>
          {this.state.errorMessage ? (
            <ErrorText style={styling.marginBottom}>{this.state.errorMessage}</ErrorText>
          ) : null}

          <BrandedButton
            enabled={this.state.consentChecked}
            onPress={this.handleCreatePatient}
            testID="button-create-profile"
          >
            {i18n.t('consent-create-profile')}
          </BrandedButton>
        </View>
      </Screen>
    );
  }
}
