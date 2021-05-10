import { Button } from '@covid/components/buttons/Button';
import DropdownField from '@covid/components/DropdownField';
import { GenericTextField } from '@covid/components/GenericTextField';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { HeaderText, RegularText } from '@covid/components/Text';
import { ValidationError } from '@covid/components/ValidationError';
import { ISchoolGroupModel } from '@covid/core/schools/Schools.dto';
import schoolNetworkCoordinator from '@covid/features/school-network/SchoolNetworkCoordinator';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import { Formik } from 'formik';
import { Form } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Alert, PickerItemProps, StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'JoinSchoolGroup'>;
  route: RouteProp<ScreenParamList, 'JoinSchoolGroup'>;
};

enum InputMode {
  input,
  dropdown,
}

type JoinGroupData = {
  groupId: string;
};

const ValidationSchema = () => {
  return Yup.object().shape({
    groupId: Yup.string().required(i18n.t('validation-error-text-required')),
  });
};

export const JoinSchoolGroupScreen: React.FC<Props> = ({ route, navigation, ...props }) => {
  const inputMode: InputMode = InputMode.dropdown;

  const currentPatient = route.params.patientData.patientState;

  const [groupList, setGroupList] = useState<PickerItemProps[]>([]);

  useEffect(() => {
    (async () => {
      const groups: ISchoolGroupModel[] = await schoolNetworkCoordinator.searchSchoolGroups(
        route.params.selectedSchool.id,
      );
      const pickerItems = groups.map<PickerItemProps>((g) => ({
        label: g.name,
        value: g.id,
      }));
      setGroupList(pickerItems);
    })();
  }, []);

  const create = () => {
    schoolNetworkCoordinator.goToCreateSchoolGroup();
  };

  const next = () => {
    schoolNetworkCoordinator.gotoNextScreen(route.name);
  };

  const onSubmit = async (schoolData: JoinGroupData) => {
    try {
      const { patientId } = route.params.patientData;
      await schoolNetworkCoordinator.addPatientToGroup(schoolData.groupId, patientId);
      next();
    } catch {
      Alert.alert(
        i18n.t('school-networks.join-error.duplicated-membership.title'),
        i18n.t('school-networks.join-error.duplicated-membership.description'),
        [
          {
            onPress: () => {
              NavigatorService.goBack();
            },
            text: i18n.t('school-networks.join-error.cta-okay'),
          },
        ],
      );
    }
  };

  return (
    <Screen navigation={navigation} profile={currentPatient.profile}>
      <Header>
        <HeaderText>{i18n.t('school-networks.join-group.title')}</HeaderText>
        <RegularText style={styles.topText}>
          {i18n.t('school-networks.join-group.description', {
            school: route.params.selectedSchool?.name ?? '',
          })}
        </RegularText>
      </Header>

      <ProgressBlock>
        <ProgressStatus color={colors.brand} maxSteps={4} step={3} />
      </ProgressBlock>

      <Formik
        initialValues={
          {
            groupId: '',
          } as JoinGroupData
        }
        onSubmit={onSubmit}
        validationSchema={ValidationSchema()}
      >
        {(formikProps) => {
          return (
            <Form style={styles.formContainer}>
              <View>
                <View style={{ height: 16 }} />
                {inputMode === InputMode.input && (
                  <GenericTextField
                    showError
                    formikProps={formikProps}
                    label={i18n.t('school-networks.join-group.input.label')}
                    name="groupName"
                    placeholder={i18n.t('school-networks.join-group.input.placeholder')}
                  />
                )}

                {inputMode === InputMode.dropdown && (
                  <DropdownField
                    error={formikProps.touched.groupId && formikProps.errors.groupId}
                    items={groupList}
                    label={i18n.t('school-networks.join-group.dropdown.label')}
                    onValueChange={formikProps.handleChange('groupId')}
                    selectedValue={formikProps.values.groupId}
                  />
                )}
              </View>

              <View>
                {!!Object.keys(formikProps.errors).length && formikProps.submitCount > 0 && (
                  <ValidationError error={i18n.t('validation-error-text')} style={{ marginHorizontal: 16 }} />
                )}
                <Button branded onPress={formikProps.handleSubmit}>
                  {i18n.t('school-networks.join-group.next')}
                </Button>
              </View>
            </Form>
          );
        }}
      </Formik>
    </Screen>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  primaryButton: {
    backgroundColor: colors.brand,
    marginHorizontal: 16,
    marginTop: 16,
  },
  primaryButtonText: {
    color: colors.white,
  },
  root: {
    backgroundColor: colors.white,
    flex: 1,
    height: '100%',
  },
  topText: {
    marginTop: 16,
  },
});
