import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import { Form } from 'native-base';
import React, { Component } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import * as Yup from 'yup';

import { colors } from '../../../theme';
import { BrandedButton, ErrorText, HeaderText, RegularText } from '../../components/Text';
import { ValidatedTextInput } from '../../components/ValidatedTextInput';
import { PushNotificationService } from '../../core/PushNotificationService';
import { PiiRequest } from '../../core/user/dto/UserAPIContracts';
import i18n from '../../locale/i18n';
import Navigator from '../Navigation';
import { ScreenParamList } from '../ScreenParamList';
import { ApiErrorState, initialErrorState } from '../../core/ApiServiceErrors';
import { userService, offlineService } from '../../Services';
import { LoadingModal } from '../../components/Loading';
import { Constants } from 'expo';

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
  private phoneComponent: any;

  constructor(props: PropsType) {
    super(props);
    this.state = initialState;
  }

  private async setPushToken() {
    const pushService = new PushNotificationService();
    await pushService.initPushToken();
  }

  private async savePiiData(formData: OptionalInfoData) {
    const name = formData.name?.trim();
    const phone = formData.phone?.trim();
    const hasFormData = name || phone;

    if (hasFormData) {
      const piiDoc = {
        ...(name && { name: name }),
        ...(phone && { phone_number: phone }),
      } as Partial<PiiRequest>;
      await userService.updatePii(piiDoc);
    }
  }

  private async gotoNextScreen(patientId: string) {
    const currentPatient = await userService.getCurrentPatient(patientId);
    Navigator.gotoNextScreen(this.props.route.name, { currentPatient });
  }

  private async handleSaveOptionalInfos(formData: OptionalInfoData) {
    try {
      const patientId = this.props.route.params.patientId;
      await this.setPushToken();
      await this.savePiiData(formData);
      await this.gotoNextScreen(patientId);
    } catch (error) {
      this.setState({
        isApiError: true,
        error: error,
        onRetry: () => {
          this.setState({
            status: i18n.t('errors.status-retrying'),
            error: null,
          });
          setTimeout(() => {
            this.setState({ status: i18n.t('errors.status-loading') });
            this.handleSaveOptionalInfos(formData);
          }, offlineService.getRetryDelay());
        },
      });
    }
  }

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
            status={this.state.status}
            onRetry={this.state.onRetry}
            onPress={() => this.setState({ isApiError: false })}
          />
        )}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView style={styles.rootContainer} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <Formik
              initialValues={{ name: '', phone: '' }}
              validationSchema={this.registerSchema}
              onSubmit={(values: OptionalInfoData) => this.handleSaveOptionalInfos(values)}>
              {(props) => {
                return (
                  <View>
                    <View>
                      <HeaderText style={{ marginBottom: 24 }}>{i18n.t('optional-info.title')}</HeaderText>

                      <RegularText>{i18n.t('optional-info.description')}</RegularText>

                      <Form>
                        <ValidatedTextInput
                          placeholder={i18n.t('optional-info.name-placeholder')}
                          value={props.values.name}
                          onChangeText={props.handleChange('name')}
                          onBlur={props.handleBlur('name')}
                          error={props.touched.name && props.errors.name}
                          returnKeyType="next"
                          onSubmitEditing={() => {
                            this.phoneComponent.focus();
                          }}
                        />

                        <ValidatedTextInput
                          ref={(input) => (this.phoneComponent = input)}
                          placeholder={i18n.t('optional-info.phone-placeholder')}
                          value={props.values.phone}
                          onChangeText={props.handleChange('phone')}
                          onBlur={props.handleBlur('phone')}
                          error={props.touched.phone && props.errors.phone}
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
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.backgroundPrimary,
    paddingHorizontal: 24,
    paddingTop: 56,
  },
});
