import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Formik } from 'formik';
import { Form } from 'native-base';
import * as Yup from 'yup';

import { Button } from '@covid/components/Buttons/Button';
import DropdownField from '@covid/components/DropdownField';
import Screen from '@covid/components/Screen';
import { SchoolModel } from '@covid/core/schools/Schools.dto';
import { ISchoolService } from '@covid/core/schools/SchoolService';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';

import { JoinHeader } from './partials';

interface IProps {
  navigation: StackNavigationProp<ScreenParamList, 'ConfirmSchool'>;
  route: RouteProp<ScreenParamList, 'ConfirmSchool'>;
}

function JoinHigherEducationScreen({ navigation, route }: IProps) {
  const [schools, setSchools] = useState<SchoolModel[]>([]);
  const service = useInjection<ISchoolService>(Services.SchoolService);
  const { patientData } = route.params;

  const validationSchema = Yup.object().shape({
    schoolId: Yup.string().required(i18n.t('validation-error-text-required')),
  });

  useEffect(() => {
    (async () => {
      const schools = await service.getSchools();
      setSchools(schools.filter((s) => s.higher_education === true));
    })();
  }, []);

  return (
    <Screen profile={patientData.patientState.profile} navigation={navigation}>
      <JoinHeader
        headerText="school-networks.join-school.title-higher-education"
        bodyText="school-networks.join-school.description-higher-education"
        currentStep={1}
        maxSteps={1}
      />
      <Formik
        initialValues={{ schoolId: '' }}
        validationSchema={validationSchema}
        onSubmit={async ({ schoolId }, FormikProps) => {
          try {
            // setIsLoading(true);
            //const response = await service.getSchoolById(schoolCode);
            // NavigatorService.navigate('ConfirmSchool', {
            //   patientData: route.params.patientData,
            //   school: response[0],
            // });
          } catch (error) {
            FormikProps.setFieldError('schoolId', 'Incorrect code');
          }
        }}>
        {(formikProps) => (
          <Form style={styles.formContainer}>
            <DropdownField
              selectedValue={formikProps.values.schoolId}
              onValueChange={formikProps.handleChange('schoolId')}
              label={i18n.t('school-networks.join-school.dropdown.label-higher-education')}
              items={schools.map((item) => ({ label: item.name, value: item.id }))}
              error={formikProps.touched.schoolId && formikProps.errors.schoolId}
            />
            <Button onPress={formikProps.handleSubmit} branded>
              {i18n.t('school-networks.join-school.cta')}
            </Button>
          </Form>
        )}
      </Formik>
    </Screen>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
});

export default JoinHigherEducationScreen;
