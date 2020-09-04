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
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import { ISchoolService } from '@covid/core/schools/SchoolService';

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

export const JoinSchoolScreen: React.FC<Props> = ({ route, navigation, ...props }) => {
  const inputMode: InputMode = InputMode.dropdown;
  const service = useInjection<ISchoolService>(Services.SchoolService);
  const [schoolList, setSchoolList] = useState<PickerItemProps[]>([]);

  useEffect(() => {
    (async () => {
      const schools = await service.getSchools();
      const pickerItems = schools.map<PickerItemProps>((s) => ({
        label: s.name,
        value: s.id,
      }));
      setSchoolList(pickerItems);
    })();
  }, []);

  const onSubmit = (schoolData: JoinSchoolData) => {
    schoolNetworkCoordinator.selectedSchoolId = schoolData.schoolId;
    next();
  };

  const next = () => schoolNetworkCoordinator.gotoNextScreen(route.name);

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
        onSubmit={onSubmit}>
        {(formikProps) => (
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
            <Button onPress={formikProps.handleSubmit} branded>
              Next
            </Button>
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
