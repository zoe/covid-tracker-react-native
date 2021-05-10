import { BrandedButton } from '@covid/components';
import { LoadingModal } from '@covid/components/Loading';
import { ErrorText, HeaderText, RegularText } from '@covid/components/Text';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import { ApiErrorState, initialErrorState } from '@covid/core/api/ApiServiceErrors';
import { IPatientService } from '@covid/core/patient/PatientService';
import { PiiRequest } from '@covid/core/user/dto/UserAPIContracts';
import { IUserService } from '@covid/core/user/UserService';
import { ScreenParamList } from '@covid/features';
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

import appCoordinator from '../AppCoordinator';

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

  private async handleSaveOptionalInfos(formData: OptionalInfoData) {
    try {
      await this.subscribeForPushNotifications();
      await this.savePiiData(formData);
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
            this.handleSaveOptionalInfos(formData);
          }, offlineService.getRetryDelay());
        },
      });
    }
  }

  // see http://regexlib.com/(X(1)A(TahywDmnNCw0iyuu7jNEB2AWTPaTyZQd-r8XZECVzmio5oP08fV7JoAWrNnIoyH3vysaiCJYtQO_FfuRAXJRSwB8zqAr_L9ddGD5V0eCJcVBJ65SiOnOt1tLVw4pd_Q3Q0FoUOPG5fXsbR6DHK6jqtBaIxnP0NL5oevVH6y0uSXhYgbCrrRx1DeE-59F0s5i0))/UserPatterns.aspx?authorid=d95177b0-6014-4e73-a959-73f1663ae814&AspxAutoDetectCookieSupport=1
  registerSchema = Yup.object().shape({
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
            <Formik
              initialValues={{ name: '', phone: '' }}
              onSubmit={(values: OptionalInfoData) => this.handleSaveOptionalInfos(values)}
              validationSchema={this.registerSchema}
            >
              {(props) => {
                return (
                  <View>
                    <View>
                      <HeaderText style={{ marginBottom: 24 }}>{i18n.t('optional-info.title')}</HeaderText>

                      <RegularText>{i18n.t('optional-info.description')}</RegularText>

                      <Form>
                        <ValidatedTextInput
                          error={props.touched.name && props.errors.name}
                          onBlur={props.handleBlur('name')}
                          onChangeText={props.handleChange('name')}
                          onSubmitEditing={() => {
                            this.phoneComponent.focus();
                          }}
                          placeholder={i18n.t('optional-info.name-placeholder')}
                          returnKeyType="next"
                          value={props.values.name}
                        />

                        <ValidatedTextInput
                          error={props.touched.phone && props.errors.phone}
                          onBlur={props.handleBlur('phone')}
                          onChangeText={props.handleChange('phone')}
                          placeholder={i18n.t('optional-info.phone-placeholder')}
                          ref={(input) => (this.phoneComponent = input)}
                          value={props.values.phone}
                        />
                        {props.errors.phone && <ErrorText>{props.errors.phone}</ErrorText>}
                      </Form>
                    </View>
                    <View>
                      <ErrorText>{this.state.errorMessage}</ErrorText>
                    </View>

                    <View>
                      <BrandedButton onPress={props.handleSubmit}>{i18n.t('optional-info.button')}</BrandedButton>
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
