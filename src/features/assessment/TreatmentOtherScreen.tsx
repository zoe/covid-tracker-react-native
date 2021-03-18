import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import { Form, Item, Label, Text, Textarea } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';

import i18n from '@covid/locale/i18n';
import { BrandedButton, HeaderText } from '@covid/components/Text';
import Screen, { FieldWrapper, Header, ProgressBlock } from '@covid/components/Screen';
import ProgressStatus from '@covid/components/ProgressStatus';
import { assessmentService } from '@covid/Services';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { AssessmentInfosRequest } from '@covid/core/assessment/dto/AssessmentInfosRequest';

import { ScreenParamList } from '../ScreenParamList';

const initialFormValues = {
  description: '',
};

interface ITreatmentData {
  description: string;
}

type TreatmentOtherProps = {
  navigation: StackNavigationProp<ScreenParamList, 'TreatmentOther'>;
  route: RouteProp<ScreenParamList, 'TreatmentOther'>;
};

export default class TreatmentOtherScreen extends Component<TreatmentOtherProps> {
  registerSchema = Yup.object().shape({
    description: Yup.string(),
  });

  handleUpdateTreatment = async (formData: ITreatmentData) => {
    let assessment: Partial<AssessmentInfosRequest> = {};

    if (formData.description) {
      assessment = {
        treatment: formData.description,
      };
    }

    await assessmentService.completeAssessment(
      assessment,
      assessmentCoordinator.assessmentData.patientData.patientInfo!
    );
    assessmentCoordinator.gotoNextScreen(this.props.route.name);
  };

  render() {
    const currentPatient = assessmentCoordinator.assessmentData.patientData.patientState;
    const title =
      this.props.route.params.location === 'back_from_hospital'
        ? i18n.t('treatment-other-title-after')
        : i18n.t('treatment-other-title-during');
    const question =
      this.props.route.params.location === 'back_from_hospital'
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
          onSubmit={(values: ITreatmentData) => {
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
