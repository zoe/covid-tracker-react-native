import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Formik } from 'formik';
import { Form } from 'native-base';
import * as Yup from 'yup';

import { colors } from '@theme';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { GenericTextField } from '@covid/components/GenericTextField';
import Screen from '@covid/components/Screen';
import { RegularText } from '@covid/components/Text';
import { TwoButtonModal } from '@covid/components/TwoButtonModal';
import { Button } from '@covid/components/Buttons/Button';
import schoolNetworkCoordinator from '@covid/features/school-network/SchoolNetworkCoordinator';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import { ISchoolService } from '@covid/core/schools/SchoolService';
import i18n from '@covid/locale/i18n';
import { ValidationError } from '@covid/components/ValidationError';
import NavigatorService from '@covid/NavigatorService';
import { RootState } from '@covid/core/state/root';
import { selectJoinedGroups, selectPreviouslyJoinedGroups } from '@covid/core/schools/Schools.slice';

import { JoinHeader, RemoveSchoolButton, SelectedSchool } from './partials';
import { SchoolForm } from './forms';

interface IProps {
  navigation: StackNavigationProp<ScreenParamList, 'JoinSchool'>;
  route: RouteProp<ScreenParamList, 'JoinSchool'>;
}

function JoinSchoolScreen({ route, navigation }: IProps) {
  const [isModalVisible, setModalVisible] = useState(false);
  const service = useInjection<ISchoolService>(Services.SchoolService);
  const currentPatient = route.params.patientData.patientState;

  const currentJoinedGroup = useSelector((state: RootState) =>
    selectPreviouslyJoinedGroups(state, currentPatient.patientId, false)
  );

  const previouslyJoinedGroups = useSelector((state: RootState) => selectJoinedGroups(state, false));

  const onRemove = (schoolId: string) => {
    schoolNetworkCoordinator.removePatientFromGroupList(previouslyJoinedGroups!, schoolId, currentPatient.patientId);
    setModalVisible(false);
    schoolNetworkCoordinator.closeFlow();
  };

  const validationSchema = Yup.object().shape({
    schoolCode: Yup.string()
      .required('Please enter your school code.')
      .matches(/^[a-zA-Z0-9_-]{7}$/, 'Code contains seven characters'),
  });

  return (
    <Screen profile={currentPatient.profile} navigation={navigation} simpleCallout>
      {currentJoinedGroup ? (
        <SelectedSchool
          title="School Networks"
          body="Body text to translate"
          organisation="School"
          currentJoinedGroup={currentJoinedGroup}
          previouslyJoinedGroups={previouslyJoinedGroups}
          currentPatient={currentPatient}
        />
      ) : (
        <>
          <JoinHeader
            headerText="school-networks.join-school.school-code-title"
            bodyText="school-networks.join-school.school-code-instructions"
            currentStep={1}
            maxSteps={4}
          />
          <Formik
            initialValues={{ schoolCode: '' }}
            validationSchema={validationSchema}
            onSubmit={async ({ schoolCode }, FormikProps) => {
              try {
                // setIsLoading(true);
                const response = await service.getSchoolById(schoolCode);
                NavigatorService.navigate('ConfirmSchool', {
                  patientData: route.params.patientData,
                  school: response[0],
                });
              } catch (error) {
                FormikProps.setFieldError('schoolId', 'Incorrect code');
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
                      if (currentJoinedGroup) {
                        onRemove(currentJoinedGroup.school.id);
                      }
                    }}
                  />
                )}
                <View>
                  <View style={{ marginTop: 16 }}>
                    {currentJoinedGroup ? (
                      <View style={styles.box}>
                        <RegularText>{currentJoinedGroup.school.name}</RegularText>
                      </View>
                    ) : (
                      <GenericTextField
                        formikProps={formikProps}
                        placeholder={i18n.t('school-networks.join-school.school-code-placeholder')}
                        maxLength={7}
                        name="schoolCode"
                        showError
                      />
                    )}
                  </View>
                </View>
                <View>
                  {!!Object.keys(formikProps.errors).length && formikProps.submitCount > 0 && (
                    <ValidationError style={{ marginHorizontal: 16 }} error={i18n.t('validation-error-text')} />
                  )}
                  {currentJoinedGroup ? (
                    <>
                      <RemoveSchoolButton
                        onPress={() => setModalVisible(true)}
                        text="school-networks.join-school.remove"
                      />
                      <Button
                        onPress={async () => {
                          await schoolNetworkCoordinator.setSelectedSchool(currentJoinedGroup.school);
                          schoolNetworkCoordinator.goToGroupList();
                        }}
                        branded>
                        {i18n.t('school-networks.join-school.cta')}
                      </Button>
                    </>
                  ) : (
                    <Button onPress={formikProps.handleSubmit} branded>
                      {i18n.t('school-networks.join-school.cta')}
                    </Button>
                  )}
                </View>
              </Form>
            )}
          </Formik>
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  box: {
    alignContent: 'center',
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 16,
    marginHorizontal: 16,
    padding: 16,
  },
  textContainer: {
    marginHorizontal: 16,
  },
  primaryButton: {
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: colors.brand,
  },
  primaryButtonText: {
    color: colors.white,
  },
});

export default JoinSchoolScreen;
