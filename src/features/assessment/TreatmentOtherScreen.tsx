import { BrandedButton, RegularText, TextareaWithCharCount } from '@covid/components';
import { Form } from '@covid/components/Form';
import { ProgressHeader } from '@covid/components/ProgressHeader';
import { Screen } from '@covid/components/Screen';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { TAssessmentInfosRequest } from '@covid/core/assessment/dto/AssessmentInfosRequest';
import i18n from '@covid/locale/i18n';
import { TScreenParamList } from '@covid/routes/types';
import { assessmentService } from '@covid/services';
import { styling } from '@covid/themes';
import { RouteProp } from '@react-navigation/native';
import { Formik } from 'formik';
import * as React from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';

const initialFormValues = {
  description: '',
};

interface ITreatmentData {
  description: string;
}

type TTreatmentOtherProps = {
  route: RouteProp<TScreenParamList, 'TreatmentOther'>;
};

export default class TreatmentOtherScreen extends React.Component<TTreatmentOtherProps> {
  registerSchema = Yup.object().shape({
    description: Yup.string(),
  });

  onSubmit = async (values: ITreatmentData) => {
    let assessment: Partial<TAssessmentInfosRequest> = {};

    if (values.description) {
      assessment = {
        treatment: values.description,
      };
    }

    await assessmentService.completeAssessment(
      assessment,
      assessmentCoordinator.assessmentData?.patientData?.patientInfo!,
    );
    assessmentCoordinator.gotoNextScreen(this.props.route.name);
  };

  render() {
    const title =
      this.props.route.params?.location === 'back_from_hospital'
        ? i18n.t('treatment-other-title-after')
        : i18n.t('treatment-other-title-during');
    const question =
      this.props.route.params?.location === 'back_from_hospital'
        ? i18n.t('treatment-other-question-treatment-after')
        : i18n.t('treatment-other-question-treatment-during');

    return (
      <Screen
        profile={assessmentCoordinator.assessmentData?.patientData?.patientState?.profile}
        testID="treatment-other-screen"
      >
        <ProgressHeader currentStep={5} maxSteps={5} title={title} />

        <Formik initialValues={initialFormValues} onSubmit={this.onSubmit} validationSchema={this.registerSchema}>
          {(formikProps) => {
            return (
              <Form>
                <RegularText style={styling.marginVertical}>{question}</RegularText>
                <TextareaWithCharCount
                  bordered
                  onChangeText={formikProps.handleChange('description')}
                  placeholder={i18n.t('placeholder-optional-question')}
                  value={formikProps.values.description}
                />
                <View style={styling.flex} />
                <BrandedButton onPress={formikProps.handleSubmit}>{i18n.t('completed')}</BrandedButton>
              </Form>
            );
          }}
        </Formik>
      </Screen>
    );
  }
}
