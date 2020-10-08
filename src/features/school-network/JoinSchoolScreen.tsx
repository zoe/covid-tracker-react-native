import React, { useEffect, useState } from 'react';
import { PickerItemProps, StyleSheet, TouchableOpacity, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Formik } from 'formik';
import { Form } from 'native-base';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';

import { colors } from '@theme';
import { ClickableText, HeaderText, RegularText } from '@covid/components/Text';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { GenericTextField } from '@covid/components/GenericTextField';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import schoolNetworkCoordinator from '@covid/features/school-network/SchoolNetworkCoordinator';
import { Button } from '@covid/components/Buttons/Button';
import DropdownField from '@covid/components/DropdownField';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import { ISchoolService } from '@covid/core/schools/SchoolService';
import i18n from '@covid/locale/i18n';
import { SchoolModel, SubscribedSchoolGroupStats } from '@covid/core/schools/Schools.dto';
import { ValidationError } from '@covid/components/ValidationError';
import { openWebLink } from '@covid/utils/links';
import { RootState } from '@covid/core/state/root';
import { Optional } from '@covid/utils/types';
import { TwoButtonModal } from '@covid/components/TwoButtonModal';
import NavigatorService from '@covid/NavigatorService';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'JoinSchool'>;
  route: RouteProp<ScreenParamList, 'JoinSchool'>;
};

type JoinSchoolData = {
  schoolId: string;
};

enum InputMode {
  input,
  dropdown,
}

const validationSchema = () => {
  return Yup.object().shape({
    schoolId: Yup.string().required(i18n.t('validation-error-text-required')),
  });
};

export const JoinSchoolScreen: React.FC<Props> = ({ route, navigation, ...props }) => {
  const inputMode: InputMode = InputMode.dropdown;
  const service = useInjection<ISchoolService>(Services.SchoolService);
  const [schools, setSchools] = useState<SchoolModel[]>([]);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const { higherEducation } = route.params;

  const previouslyJoinedGroups = useSelector<RootState, Optional<SubscribedSchoolGroupStats[]>>((state) =>
    state.school.joinedSchoolNetworks?.filter((group) => group.school.higher_education === higherEducation)
  );

  const currentPatient = route.params.patientData.patientState;

  const getSchoolPickerItems = schools.map<PickerItemProps>((s) => ({
    label: s.name,
    value: s.id,
  }));

  useEffect(() => {
    (async () => {
      const schools = await service.getSchools();
      setSchools(schools.filter((s) => s.higher_education === higherEducation));
    })();
  }, []);

  const onSubmit = async (schoolData: JoinSchoolData) => {
    const selectedSchool = schools.find((school) => school.id === schoolData.schoolId)!;
    await schoolNetworkCoordinator.setSelectedSchool(selectedSchool);

    if (selectedSchool.higher_education) {
      console.log(previouslyJoinedGroups);
      NavigatorService.goBack();
    } else if (!currentJoinedGroup) {
      schoolNetworkCoordinator.goToJoinGroup();
    } else {
      schoolNetworkCoordinator.goToGroupList();
    }
  };

  const onRemove = (schoolId: string) => {
    schoolNetworkCoordinator.removePatientFromGroupList(
      previouslyJoinedGroups!,
      schoolId,
      route.params.patientData.patientId
    );
    setModalVisible(false);
    schoolNetworkCoordinator.closeFlow();
  };

  const { patientId } = route.params.patientData;

  const currentJoinedGroup = previouslyJoinedGroups
    ? previouslyJoinedGroups.find((s) => s.patient_id === patientId)
    : undefined;

  const initialValues: JoinSchoolData = {
    schoolId: currentJoinedGroup ? currentJoinedGroup.school.id : '',
  };

  return (
    <Screen profile={currentPatient.profile} navigation={navigation} simpleCallout>
      <Header>
        <HeaderText>
          {higherEducation
            ? i18n.t('school-networks.join-school.title-higher-education')
            : i18n.t('school-networks.join-school.title')}
        </HeaderText>

        {higherEducation && (
          <RegularText style={styles.topText}>
            {i18n.t('school-networks.join-school.description-higher-education')}
          </RegularText>
        )}
        {!higherEducation && (
          <RegularText style={styles.topText}>
            {i18n.t('school-networks.join-school.description')}
            <RegularText
              style={{ color: colors.purple }}
              passProps={{ onPress: schoolNetworkCoordinator.goToSchoolIntro }}>
              {' '}
              {i18n.t('school-networks.join-school.description-link')}
            </RegularText>
          </RegularText>
        )}
      </Header>

      <ProgressBlock>
        <ProgressStatus step={1} maxSteps={3} color={colors.brand} />
      </ProgressBlock>

      <Formik initialValues={initialValues} validationSchema={validationSchema()} onSubmit={onSubmit}>
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

            <View>
              <View style={{ height: 16 }} />
              {inputMode === InputMode.input && (
                <GenericTextField
                  formikProps={formikProps}
                  placeholder={i18n.t('school-networks.join-school.search.placeholder')}
                  label={i18n.t('school-networks.join-school.search.label')}
                  name="schoolName"
                  showError
                />
              )}
              {inputMode === InputMode.dropdown && (
                <DropdownField
                  selectedValue={formikProps.values.schoolId}
                  onValueChange={formikProps.handleChange('schoolId')}
                  label={
                    higherEducation
                      ? i18n.t('school-networks.join-school.dropdown.label-higher-education')
                      : i18n.t('school-networks.join-school.dropdown.label')
                  }
                  items={getSchoolPickerItems}
                  error={formikProps.touched.schoolId && formikProps.errors.schoolId}
                />
              )}
            </View>

            {!higherEducation && (
              <View style={styles.textContainer}>
                <RegularText>
                  <RegularText>{i18n.t('school-networks.join-school.disclaimer-1')}</RegularText>
                  <ClickableText onPress={() => openWebLink('https://covid.joinzoe.com/')}>
                    {i18n.t('school-networks.join-school.disclaimer-2')}
                  </ClickableText>
                </RegularText>
                <RegularText style={{ marginTop: 16 }}>
                  {i18n.t('school-networks.join-school.disclaimer-3')}
                </RegularText>
              </View>
            )}

            <View>
              {!!Object.keys(formikProps.errors).length && formikProps.submitCount > 0 && (
                <ValidationError style={{ marginHorizontal: 16 }} error={i18n.t('validation-error-text')} />
              )}
              {currentJoinedGroup && (
                <TouchableOpacity style={{ margin: 16 }} onPress={() => setModalVisible(true)}>
                  <RegularText style={{ textAlign: 'center', color: colors.coral }}>
                    {i18n.t('school-networks.join-school.remove')}
                  </RegularText>
                </TouchableOpacity>
              )}
              {higherEducation && previouslyJoinedGroups!.length === 0 && (
                <Button onPress={formikProps.handleSubmit} branded>
                  {i18n.t('school-networks.join-school.cta')}
                </Button>
              )}
              {!higherEducation && (
                <Button onPress={formikProps.handleSubmit} branded>
                  {i18n.t('school-networks.join-school.cta')}
                </Button>
              )}
            </View>
          </Form>
        )}
      </Formik>
    </Screen>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.white,
  },
  formContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  textContainer: {
    marginHorizontal: 16,
  },
  topText: {
    marginTop: 16,
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
