import { BrandedButton } from '@covid/components';
import { CheckboxItem } from '@covid/components/Checkbox';
import { LoadingModal } from '@covid/components/Loading';
import Screen, { Header } from '@covid/components/Screen';
import { ClickableText, ErrorText, HeaderText, RegularText } from '@covid/components/Text';
import { ApiErrorState, initialErrorState } from '@covid/core/api/ApiServiceErrors';
import { patientService } from '@covid/core/patient/PatientService';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import { appCoordinator } from '@covid/features/AppCoordinator';
import { ConsentType, ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { offlineService } from '@covid/services';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { View } from 'react-native';

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

export default class ConsentForOtherScreen extends React.Component<RenderProps, ConsentState> {
  constructor(props: RenderProps) {
    super(props);
    this.state = initialState;
  }

  handleConsentClick = (checked: boolean) => {
    this.setState({ consentChecked: checked });
  };

  isAdultConsent = () => {
    return this.props.route.params?.consentType === ConsentType.Adult;
  };

  headerText = this.isAdultConsent() ? i18n.t('adult-consent-title') : i18n.t('child-consent-title');

  consentLabel = this.isAdultConsent() ? i18n.t('adult-consent-confirm') : i18n.t('child-consent-confirm');

  createPatient = async (): Promise<string> => {
    const newPatient = {
      avatar_name: this.props.route.params?.avatarName,
      name: this.props.route.params?.profileName,
      reported_by_another: true,
    } as Partial<PatientInfosRequest>;

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
      <Screen showBackButton navigation={this.props.navigation} testID="consent-for-other-screen">
        {this.state.isApiError ? (
          <LoadingModal
            error={this.state.error}
            onPress={() => this.setState({ isApiError: false })}
            onRetry={this.state.onRetry}
            status={this.state.status}
          />
        ) : null}
        <Header>
          <HeaderText style={{ marginBottom: 12 }}>{this.headerText}</HeaderText>
          {this.isAdultConsent() ? (
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
                {i18n.t('consent-summary')}
              </ClickableText>{' '}
              {i18n.t('child-consent-text-2')}
            </RegularText>
          )}
        </Header>

        <View style={{ marginHorizontal: 16 }}>
          <CheckboxItem onChange={this.handleConsentClick} testID="checkbox-consent" value={this.state.consentChecked}>
            {this.consentLabel}
          </CheckboxItem>
        </View>

        <ErrorText>{this.state.errorMessage}</ErrorText>

        <BrandedButton
          enabled={this.state.consentChecked}
          onPress={this.handleCreatePatient}
          testID="button-create-profile"
        >
          {i18n.t('consent-create-profile')}
        </BrandedButton>

        <View style={{ height: 16 }} />
      </Screen>
    );
  }
}
