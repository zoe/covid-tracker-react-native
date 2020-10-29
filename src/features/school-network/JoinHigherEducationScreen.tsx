import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Formik } from 'formik';
import { Form } from 'native-base';
import * as Yup from 'yup';

import { Button } from '@covid/components/Buttons/Button';
import DropdownField from '@covid/components/DropdownField';
import Screen from '@covid/components/Screen';
import { TwoButtonModal } from '@covid/components/TwoButtonModal';
import { SchoolModel } from '@covid/core/schools/Schools.dto';
import { ISchoolService } from '@covid/core/schools/SchoolService';
import schoolNetworkCoordinator from '@covid/features/school-network/SchoolNetworkCoordinator';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
//
import { RootState } from '@covid/core/state/root';
import { selectJoinedGroups, selectPreviouslyJoinedGroups } from '@covid/core/schools/Schools.slice';

import { JoinHeader, RemoveSchoolButton } from './partials';

interface IProps {
  navigation: StackNavigationProp<ScreenParamList, 'ConfirmSchool'>;
  route: RouteProp<ScreenParamList, 'ConfirmSchool'>;
}

function JoinHigherEducationScreen({ navigation, route }: IProps) {
  const [schools, setSchools] = useState<SchoolModel[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const service = useInjection<ISchoolService>(Services.SchoolService);
  const { patientData } = route.params;

  const validationSchema = Yup.object().shape({
    schoolId: Yup.string().required(i18n.t('validation-error-text-required')),
  });
  const previouslyJoinedGroups = useSelector((state: RootState) => selectJoinedGroups(state, true));
  const currentJoinedGroup = useSelector((state: RootState) =>
    selectPreviouslyJoinedGroups(state, patientData.patientId, true)
  );

  const initialValues = {
    schoolId: currentJoinedGroup ? currentJoinedGroup.school.id : '',
  };

  const onRemove = (schoolId: string) => {
    schoolNetworkCoordinator.removePatientFromGroupList(previouslyJoinedGroups!, schoolId, patientData.patientId);
    setModalVisible(false);
    schoolNetworkCoordinator.closeFlow();
  };

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
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async ({ schoolId }, FormikProps) => {
          try {
            const selectedSchool = schools.find((school) => school.id === schoolId)!;
            await schoolNetworkCoordinator.setSelectedSchool(selectedSchool);
            NavigatorService.goBack();
          } catch (error) {
            console.log('** error **');
            console.log(error);
            FormikProps.setFieldError('schoolId', 'Update error');
          }
        }}>
        {(formikProps) => (
          <Form style={styles.formContainer}>
            {isModalVisible && (
              <TwoButtonModal
                bodyText={
                  i18n.t('school-networks.join-school.modal-body') + ' ' + currentJoinedGroup!.school.name + '?'
                }
                button1Text={i18n.t('school-networks.join-school.button-1')}
                button2Text={i18n.t('school-networks.join-school.button-2')}
                button1Callback={() => setModalVisible(false)}
                button2Callback={() => {
                  onRemove(formikProps.values.schoolId);
                }}
              />
            )}
            <DropdownField
              selectedValue={formikProps.values.schoolId}
              onValueChange={formikProps.handleChange('schoolId')}
              label={i18n.t('school-networks.join-school.dropdown.label-higher-education')}
              items={schools.map((item) => ({ label: item.name, value: item.id }))}
              error={formikProps.touched.schoolId && formikProps.errors.schoolId}
            />
            {currentJoinedGroup ? (
              <RemoveSchoolButton
                onPress={() => setModalVisible(true)}
                text="school-networks.join-school.removeHigherEducation"
              />
            ) : (
              <Button onPress={formikProps.handleSubmit} branded>
                {i18n.t('school-networks.join-school.cta')}
              </Button>
            )}
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
