import React from 'react';
import { StyleSheet, View } from 'react-native';
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

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'JoinSchoolNetwork'>;
  route: RouteProp<ScreenParamList, 'JoinSchoolNetwork'>;
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
  return (
    <View style={styles.root}>
      <Screen style={styles.root}>
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

        <Formik initialValues={{}} onSubmit={(values: any) => {}}>
          {(formikProps) => {
            return (
              <Form>
                <View style={styles.formContainer}>
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
                    {inputMode === InputMode.dropdown && <DropdownField label="Name of school" />}
                  </View>
                </View>
              </Form>
            );
          }}
        </Formik>
      </Screen>
      <View>
        <Button onPress={next} branded>
          Next
        </Button>
        <View style={{ height: 32 }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.white,
  },
  formContainer: {
    height: '100%',
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
