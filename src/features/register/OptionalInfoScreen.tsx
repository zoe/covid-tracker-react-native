import { BrandedButton } from '@covid/components';
import { LoadingModal } from '@covid/components/Loading';
import { ErrorText, HeaderText, RegularText } from '@covid/components/Text';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import { ApiErrorState, initialErrorState } from '@covid/core/api/ApiServiceErrors';
import { IPatientService } from '@covid/core/patient/PatientService';
import { PiiRequest } from '@covid/core/user/dto/UserAPIContracts';
import { IUserService } from '@covid/core/user/UserService';
import { ScreenParamList } from '@covid/features';
import appCoordinator from '@covid/features/AppCoordinator';
import i18n from '@covid/locale/i18n';
import { lazyInject } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';
import { offlineService, pushNotificationService } from '@covid/Services';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import Constants from 'expo-constants';
import { Formik } from 'formik';
import { Form } from 'native-base';
import React, { Component } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import * as Yup from 'yup';

type PropsType = {
  navigation: StackNavigationProp<ScreenParamList, 'OptionalInfo'>;
  route: RouteProp<ScreenParamList, 'OptionalInfo'>;
};

type State = {
  errorMessage: string;
} & ApiErrorState;

const initialState: State = {
  ...initialErrorState,
  errorMessage: '',
};

interface OptionalInfoData {
  name: string;
  phone: string;
}

const initialValues = { name: '', phone: '' };

export class OptionalInfoScreen extends Component<PropsType, State> {
  @lazyInject(Services.User)
  private readonly userService: IUserService;

  @lazyInject(Services.Patient)
  private readonly patientService: IPatientService;

  private phoneComponent: any;

  constructor(props: PropsType) {
    super(props);
    this.state = initialState;
  }

  private async subscribeForPushNotifications() {
    if (Constants.appOwnership !== 'expo') {
      await pushNotificationService.subscribeForPushNotifications();
    }
  }

  private async savePiiData(formData: OptionalInfoData) {
    const hasFormData = formData.phone?.trim() || formData.name?.trim();

    if (hasFormData) {
      const piiDoc = {
        ...(formData.name && { name: formData.name }),
        ...(formData.phone && { phone_number: formData.phone }),
      } as Partial<PiiRequest>;
      await this.userService.updatePii(piiDoc);
    }
  }

  private async onSubmit(values: OptionalInfoData) {
    try {
      await this.subscribeForPushNotifications();
      await this.savePiiData(values);
      this.setState({ isApiError: false });
      appCoordinator.gotoNextScreen(this.props.route.name);
    } catch (error) {
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
            this.onSubmit(values);
          }, offlineService.getRetryDelay());
        },
      });
    }
  }

  validationSchema = Yup.object().shape({
    name: Yup.string(),
    phone: Yup.string(),
  });

  render() {
    return (
      <>
        {this.state.isApiError && (
          <LoadingModal
            error={this.state.error}
            onPress={() => this.setState({ isApiError: false })}
            onRetry={this.state.onRetry}
            status={this.state.status}
          />
        )}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.rootContainer}>
            <Formik initialValues={initialValues} onSubmit={this.onSubmit} validationSchema={this.validationSchema}>
              {(formikProps) => {
                return (
                  <View>
                    <View>
                      <HeaderText style={{ marginBottom: 24 }}>{i18n.t('optional-info.title')}</HeaderText>

                      <RegularText>{i18n.t('optional-info.description')}</RegularText>

                      <Form>
                        <ValidatedTextInput
                          error={formikProps.touched.name && formikProps.errors.name}
                          onBlur={formikProps.handleBlur('name')}
                          onChangeText={formikProps.handleChange('name')}
                          onSubmitEditing={() => {
                            this.phoneComponent.focus();
                          }}
                          placeholder={i18n.t('optional-info.name-placeholder')}
                          returnKeyType="next"
                          value={formikProps.values.name}
                        />

                        <ValidatedTextInput
                          error={formikProps.touched.phone && formikProps.errors.phone}
                          onBlur={formikProps.handleBlur('phone')}
                          onChangeText={formikProps.handleChange('phone')}
                          placeholder={i18n.t('optional-info.phone-placeholder')}
                          ref={(input) => (this.phoneComponent = input)}
                          value={formikProps.values.phone}
                        />
                        {formikProps.errors.phone ? <ErrorText>{formikProps.errors.phone}</ErrorText> : null}
                      </Form>
                    </View>
                    <View>
                      <ErrorText>{this.state.errorMessage}</ErrorText>
                    </View>

                    <View>
                      <BrandedButton onPress={formikProps.handleSubmit}>{i18n.t('optional-info.button')}</BrandedButton>
                    </View>
                  </View>
                );
              }}
            </Formik>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: colors.backgroundPrimary,
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 56,
  },
});
