import { Button } from '@covid/components/buttons/Button';
import { RadioInput } from '@covid/components/inputs/RadioInput';
import { ISchoolModel, ISubscribedSchoolGroupStats } from '@covid/core/schools/Schools.dto';
import { schoolNetworkCoordinator } from '@covid/features/school-network/SchoolNetworkCoordinator';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { Formik } from 'formik';
import { Form } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';

interface IProps {
  currentJoinedGroup: ISubscribedSchoolGroupStats | undefined;
  schools: ISchoolModel[];
}

export default function UniversityForm({ currentJoinedGroup, schools }: IProps) {
  const initialValues = {
    schoolId: currentJoinedGroup ? currentJoinedGroup.school.id : '',
  };

  const validationSchema = Yup.object().shape({
    schoolId: Yup.string().required(i18n.t('validation-error-text-required')),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async ({ schoolId }, FormikProps) => {
        try {
          const selectedSchool = schools.find((school) => school.id === schoolId)!;
          await schoolNetworkCoordinator.setSelectedSchool(selectedSchool);
          NavigatorService.goBack();
        } catch (error) {
          FormikProps.setFieldError('schoolId', 'Update error');
        }
      }}
      validationSchema={validationSchema}
    >
      {(formikProps) => (
        <Form style={styles.formContainer}>
          <RadioInput
            error={formikProps.touched.schoolId ? formikProps.errors.schoolId : ''}
            items={schools.map((item) => ({ label: item.name, value: item.id }))}
            label={i18n.t('school-networks.join-school.dropdown.label-higher-education')}
            onValueChange={formikProps.handleChange('schoolId')}
            selectedValue={formikProps.values.schoolId}
          />
          <Button branded onPress={formikProps.handleSubmit}>
            {i18n.t('school-networks.join-school.cta')}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
});
