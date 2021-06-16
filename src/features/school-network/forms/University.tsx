import { Button } from '@covid/components/buttons/Button';
import DropdownField from '@covid/components/DropdownField';
import { ISchoolModel, ISubscribedSchoolGroupStats } from '@covid/core/schools/Schools.dto';
import schoolNetworkCoordinator from '@covid/features/school-network/SchoolNetworkCoordinator';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { Formik, FormikHelpers } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

interface IProps {
  currentJoinedGroup: ISubscribedSchoolGroupStats | undefined;
  schools: ISchoolModel[];
}

interface IValues {
  schoolId: string;
}

export default function UniversityForm({ currentJoinedGroup, schools }: IProps) {
  const initialValues = {
    schoolId: currentJoinedGroup ? currentJoinedGroup.school.id : '',
  };

  const validationSchema = Yup.object().shape({
    schoolId: Yup.string().required(i18n.t('validation-error-text-required')),
  });

  async function onSubmit(values: IValues, formikHelpers: FormikHelpers<IValues>) {
    try {
      const selectedSchool = schools.find((school) => school.id === values.schoolId)!;
      await schoolNetworkCoordinator.setSelectedSchool(selectedSchool);
      NavigatorService.goBack();
    } catch (error) {
      formikHelpers.setFieldError('schoolId', 'Update error');
    }
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {(formikProps) => (
        <View style={styles.formContainer}>
          <DropdownField
            error={formikProps.touched.schoolId && formikProps.errors.schoolId}
            items={schools.map((item) => ({ label: item.name, value: item.id }))}
            label={i18n.t('school-networks.join-school.dropdown.label-higher-education')}
            onValueChange={formikProps.handleChange('schoolId')}
            selectedValue={formikProps.values.schoolId}
          />
          <Button branded onPress={formikProps.handleSubmit}>
            {i18n.t('school-networks.join-school.cta')}
          </Button>
        </View>
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
