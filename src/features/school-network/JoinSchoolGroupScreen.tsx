import React, { useEffect, useState } from 'react';
import { PickerItemProps, StyleSheet, View, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Formik } from 'formik';
import { Form } from 'native-base';
import * as Yup from 'yup';

import { colors } from '@theme';
import { HeaderText, RegularText } from '@covid/components/Text';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { Button } from '@covid/components/buttons/Button';
import schoolNetworkCoordinator from '@covid/features/school-network/SchoolNetworkCoordinator';
import DropdownField from '@covid/components/DropdownField';
import { GenericTextField } from '@covid/components/GenericTextField';
import i18n from '@covid/locale/i18n';
import { ISchoolGroupModel } from '@covid/core/schools/Schools.dto';
import { ValidationError } from '@covid/components/ValidationError';
import NavigatorService from '@covid/NavigatorService';

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
        route.params.selectedSchool.id
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
            text: i18n.t('school-networks.join-error.cta-okay'),
            onPress: () => {
              NavigatorService.goBack();
            },
          },
        ]
      );
    }
  };

  return (
    <Screen profile={currentPatient.profile} navigation={navigation}>
      <Header>
        <HeaderText>{i18n.t('school-networks.join-group.title')}</HeaderText>
        <RegularText style={styles.topText}>
          {i18n.t('school-networks.join-group.description', {
            school: route.params.selectedSchool?.name ?? '',
          })}
        </RegularText>
      </Header>

      <ProgressBlock>
        <ProgressStatus step={3} maxSteps={4} color={colors.brand} />
      </ProgressBlock>

      <Formik
        initialValues={
          {
            groupId: '',
          } as JoinGroupData
        }
        validationSchema={ValidationSchema()}
        onSubmit={onSubmit}>
        {(formikProps) => {
          return (
            <Form style={styles.formContainer}>
              <View>
                <View style={{ height: 16 }} />
                {inputMode === InputMode.input ? (
                  <GenericTextField
                    formikProps={formikProps}
                    placeholder={i18n.t('school-networks.join-group.input.placeholder')}
                    label={i18n.t('school-networks.join-group.input.label')}
                    name="groupName"
                    showError
                  />
                ) : null}

                {inputMode === InputMode.dropdown ? (
                  <DropdownField
                    selectedValue={formikProps.values.groupId}
                    onValueChange={formikProps.handleChange('groupId')}
                    label={i18n.t('school-networks.join-group.dropdown.label')}
                    items={groupList}
                    error={formikProps.touched.groupId && formikProps.errors.groupId}
                  />
                ) : null}
              </View>

              <View>
                {!!Object.keys(formikProps.errors).length && formikProps.submitCount > 0 ? (
                  <ValidationError style={{ marginHorizontal: 16 }} error={i18n.t('validation-error-text')} />
                ) : null}
                <Button onPress={formikProps.handleSubmit} branded>
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
  root: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.white,
  },
  formContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
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
