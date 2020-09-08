import React, { useEffect, useState } from 'react';
import { PickerItemProps, StyleSheet, View } from 'react-native';
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
import { Button } from '@covid/components/Buttons/Button';
import schoolNetworkCoordinator from '@covid/features/school-network/SchoolNetworkCoordinator';
import DropdownField from '@covid/components/DropdownField';
import { GenericTextField } from '@covid/components/GenericTextField';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import { ISchoolService } from '@covid/core/schools/SchoolService';
import { useAppDispatch } from '@covid/core/state/store';
import { joinedSchoolGroup } from '@covid/core/schools/Schools.slice';
import i18n from '@covid/locale/i18n';
import { SchoolGroupModel } from '@covid/core/schools/Schools.dto';
import { ValidationError } from '@covid/components/ValidationError';

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
  const enableCreateGroup: boolean = false;

  const currentPatient = schoolNetworkCoordinator.patientData.patientState;

  const service = useInjection<ISchoolService>(Services.SchoolService);
  const [groupList, setGroupList] = useState<PickerItemProps[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const groups: SchoolGroupModel[] = await service
        .searchSchoolGroups(schoolNetworkCoordinator.selectedSchool?.id ?? '')
        .catch(() => {
          return [];
        });
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
    const { group } = await service.joinGroup(schoolData.groupId, schoolNetworkCoordinator.patientData.patientId);
    dispatch(joinedSchoolGroup(group));
    next();
  };

  return (
    <Screen profile={currentPatient.profile} navigation={navigation}>
      <Header>
        <HeaderText>{i18n.t('school-networks.join-group.title')}</HeaderText>
        <RegularText style={styles.topText}>
          {i18n.t('school-networks.join-group.description', {
            school: schoolNetworkCoordinator.selectedSchool?.name ?? '',
          })}
        </RegularText>
      </Header>

      <ProgressBlock>
        <ProgressStatus step={2} maxSteps={3} color={colors.brand} />
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
                {inputMode === InputMode.input && (
                  <GenericTextField
                    formikProps={formikProps}
                    placeholder={i18n.t('school-networks.join-group.input.placeholder')}
                    label={i18n.t('school-networks.join-group.input.label')}
                    name="groupName"
                    showError
                  />
                )}

                {inputMode === InputMode.dropdown && (
                  <DropdownField
                    selectedValue={formikProps.values.groupId}
                    onValueChange={formikProps.handleChange('groupId')}
                    label={i18n.t('school-networks.join-group.dropdown.label')}
                    items={groupList}
                    error={formikProps.touched.groupId && formikProps.errors.groupId}
                  />
                )}
                {enableCreateGroup && (
                  <Button onPress={create} outline>
                    {i18n.t('school-networks.join-group.cta')}
                  </Button>
                )}
              </View>

              {!!Object.keys(formikProps.errors).length && formikProps.submitCount > 0 && (
                <ValidationError style={{ marginHorizontal: 16 }} error={i18n.t('validation-error-text')} />
              )}

              <Button onPress={formikProps.handleSubmit} branded>
                {i18n.t('school-networks.join-group.next')}
              </Button>
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
