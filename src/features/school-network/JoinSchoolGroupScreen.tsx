import { BrandedButton } from '@covid/components';
import { Form } from '@covid/components/Form';
import { RadioInput } from '@covid/components/inputs/RadioInput';
import ProgressStatus from '@covid/components/ProgressStatus';
import { Screen } from '@covid/components/Screen';
import { HeaderText, RegularText } from '@covid/components/Text';
import { ValidationError } from '@covid/components/ValidationError';
import { ISchoolGroupModel } from '@covid/core/schools/Schools.dto';
import { schoolNetworkCoordinator } from '@covid/features/school-network/SchoolNetworkCoordinator';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { TScreenParamList } from '@covid/routes/types';
import { sizes, styling } from '@covid/themes';
import { RouteProp } from '@react-navigation/native';
import { colors } from '@theme';
import { Formik } from 'formik';
import * as React from 'react';
import { Alert, PickerItemProps, StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

type TProps = {
  route: RouteProp<TScreenParamList, 'JoinSchoolGroup'>;
};

type TJoinGroupData = {
  groupId: string;
};

const ValidationSchema = () => {
  return Yup.object().shape({
    groupId: Yup.string().required(i18n.t('validation-error-text-required')),
  });
};

const initialFormValues = {
  groupId: '',
} as TJoinGroupData;

export const JoinSchoolGroupScreen: React.FC<TProps> = ({ route }) => {
  const [groupList, setGroupList] = React.useState<PickerItemProps[]>([]);

  React.useEffect(() => {
    (async () => {
      const groups: ISchoolGroupModel[] = await schoolNetworkCoordinator.searchSchoolGroups(
        route.params?.selectedSchool?.id,
      );
      const pickerItems = groups.map<PickerItemProps>((g) => ({
        label: g.name,
        value: g.id,
      }));
      setGroupList(pickerItems);
    })();
  }, []);

  const next = () => {
    schoolNetworkCoordinator.gotoNextScreen(route.name);
  };

  const onSubmit = async (values: TJoinGroupData) => {
    try {
      await schoolNetworkCoordinator.addPatientToGroup(values.groupId, route.params?.patientData?.patientId);
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
    <Screen profile={route.params?.patientData?.patientState?.profile} testID="join-school-group-screen">
      <HeaderText>{i18n.t('school-networks.join-group.title')}</HeaderText>
      <RegularText style={styles.topText}>
        {i18n.t('school-networks.join-group.description', {
          school: route.params?.selectedSchool?.name ?? '',
        })}
      </RegularText>

      <ProgressStatus color={colors.brand} currentStep={3} maxSteps={4} style={styling.marginVertical} />

      <Formik initialValues={initialFormValues} onSubmit={onSubmit} validationSchema={ValidationSchema()}>
        {(formikProps) => {
          return (
            <Form>
              <RadioInput
                error={formikProps.touched.groupId ? formikProps.errors.groupId : ''}
                items={groupList}
                label={i18n.t('school-networks.join-group.dropdown.label')}
                onValueChange={formikProps.handleChange('groupId')}
                selectedValue={formikProps.values.groupId}
              />
              <View style={styles.flex} />
              {!!Object.keys(formikProps.errors).length && formikProps.submitCount > 0 ? (
                <ValidationError error={i18n.t('validation-error-text')} style={{ marginHorizontal: sizes.m }} />
              ) : null}
              <BrandedButton onPress={formikProps.handleSubmit}>
                {i18n.t('school-networks.join-group.next')}
              </BrandedButton>
            </Form>
          );
        }}
      </Formik>
    </Screen>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  primaryButton: {
    backgroundColor: colors.brand,
    marginHorizontal: sizes.m,
    marginTop: sizes.m,
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
    marginTop: sizes.m,
  },
});
