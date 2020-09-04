import React, { useEffect, useState } from 'react';
import { PickerItemProps, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Formik } from 'formik';
import { Form } from 'native-base';

import { colors } from '@theme';
import { HeaderText, RegularText } from '@covid/components/Text';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { GenericTextField } from '@covid/components/GenericTextField';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import schoolNetworkCoordinator from '@covid/features/school-network/SchoolNetworkCoordinator';
import { Button } from '@covid/components/Buttons/Button';
import DropdownField from '@covid/components/DropdownField';
import i18n from '@covid/locale/i18n';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'JoinSchoolNetwork'>;
  route: RouteProp<ScreenParamList, 'JoinSchoolNetwork'>;
};

type JoinSchoolData = {
  schoolId: string;
};

enum InputMode {
  input,
  dropdown,
}

export const JoinSchoolNetworkScreen: React.FC<Props> = ({ route, navigation, ...props }) => {
  const inputMode: InputMode = InputMode.dropdown;

  const next = () => {
    schoolNetworkCoordinator.gotoNextScreen(route.name);
  };

  const [schoolList, setSchoolList] = useState<PickerItemProps[]>([]);

  useEffect(() => {
    schoolNetworkCoordinator.getSchoolsList().then((schools) => {
      const pickerItems = schools.map<PickerItemProps>((s) => {
        return {
          label: s.name,
          value: s.id,
        };
      });
      setSchoolList(pickerItems);
    });
  }, []);

  const setSchoolData = (schoolData: JoinSchoolData) => {
    schoolNetworkCoordinator.setSchool(schoolData.schoolId);
  };

  return (
    <Screen>
      <Header>
        <HeaderText>Join a school network</HeaderText>
        <RegularText style={styles.topText}>
          Link this account to a school anonymously lorem upsum dolor consectume dolor. More information about
          <RegularText style={{ color: colors.purple }}> school networks.</RegularText>
        </RegularText>
      </Header>

      <ProgressBlock>
        <ProgressStatus step={2} maxSteps={3} color={colors.brand} />
      </ProgressBlock>

      <Formik
        initialValues={
          {
            schoolId: '',
          } as JoinSchoolData
        }
        onSubmit={(values: JoinSchoolData) => {
          return setSchoolData(values);
        }}>
        {(formikProps) => {
          return (
            <Form style={styles.formContainer}>
              <View>
                <View style={{ height: 16 }} />
                {inputMode === InputMode.input && (
                  <GenericTextField
                    formikProps={formikProps}
                    placeholder="Search for your child's school"
                    label="Name of school"
                    name="schoolName"
                    showError
                  />
                )}

                {inputMode === InputMode.dropdown && (
                  <DropdownField
                    selectedValue={formikProps.values.schoolId}
                    onValueChange={formikProps.handleChange('schoolId')}
                    label="Select school from below"
                    items={schoolList}
                    error={formikProps.touched.schoolId && formikProps.errors.schoolId}
                  />
                )}
              </View>
              <Button onPress={next} branded>
                Next
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
