import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import { Form, Item, Label, Text, Textarea } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';

import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { FieldWrapper, Header, ProgressBlock } from '@covid/components/Screen';
import { BrandedButton, HeaderText } from '@covid/components/Text';
import UserService from '@covid/core/user/UserService';
import i18n from '@covid/locale/i18n';
import { ScreenParamList } from '../ScreenParamList';
import AssessmentCoordinator from '@covid/features/assessment/AssessmentCoordinator';

const initialFormValues = {
  description: '',
};

interface TreatmentData {
  description: string;
}

type TreatmentOtherProps = {
  navigation: StackNavigationProp<ScreenParamList, 'TreatmentOther'>;
  route: RouteProp<ScreenParamList, 'TreatmentOther'>;
};

export default class TreatmentOtherScreen extends Component<TreatmentOtherProps> {
  constructor(props: TreatmentOtherProps) {
    super(props);
    AssessmentCoordinator.resetNavigation(props.navigation);
    this.handleUpdateTreatment = this.handleUpdateTreatment.bind(this);
  }

  registerSchema = Yup.object().shape({
    description: Yup.string(),
  });

  handleUpdateTreatment(formData: TreatmentData) {
    const { assessmentId } = AssessmentCoordinator.assessmentData;
    if (!formData.description) {
      AssessmentCoordinator.gotoNextScreen(this.props.route.name);
    } else {
      const userService = new UserService();
      userService
        .updateAssessment(assessmentId!!, {
          treatment: formData.description,
        })
        .then((r) => AssessmentCoordinator.gotoNextScreen(this.props.route.name));
    }
  }

  render() {
    const currentPatient = AssessmentCoordinator.assessmentData.currentPatient;
    const title =
      this.props.route.params.location == 'back_from_hospital'
        ? i18n.t('treatment-other-title-after')
        : i18n.t('treatment-other-title-during');
    const question =
      this.props.route.params.location == 'back_from_hospital'
        ? i18n.t('treatment-other-question-treatment-after')
        : i18n.t('treatment-other-question-treatment-during');

    return (
      <Screen profile={currentPatient.profile} navigation={this.props.navigation}>
        <Header>
          <HeaderText>{title}</HeaderText>
        </Header>

        <ProgressBlock>
          <ProgressStatus step={5} maxSteps={5} />
        </ProgressBlock>

        <Formik
          initialValues={initialFormValues}
          validationSchema={this.registerSchema}
          onSubmit={(values: TreatmentData) => {
            return this.handleUpdateTreatment(values);
          }}>
          {(props) => {
            return (
              <Form>
                <FieldWrapper style={{ marginVertical: 64 }}>
                  <Item stackedLabel>
                    <Label style={{ marginBottom: 16 }}>{question}</Label>
                    <Textarea
                      style={styles.textarea}
                      rowSpan={5}
                      bordered
                      placeholder={i18n.t('placeholder-optional-question')}
                      value={props.values.description}
                      onChangeText={props.handleChange('description')}
                      underline={false}
                    />
                  </Item>
                </FieldWrapper>

                <BrandedButton onPress={props.handleSubmit}>
                  <Text>{i18n.t('completed')}</Text>
                </BrandedButton>
              </Form>
            );
          }}
        </Formik>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  textarea: {
    width: '100%',
  },
});
