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

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'SelectSchoolNetwork'>;
  route: RouteProp<ScreenParamList, 'SelectSchoolNetwork'>;
};

enum InputMode {
  input,
  dropdown,
}

const inputMode: InputMode = InputMode.dropdown;
export const SelectSchoolNetworkScreen: React.FC<Props> = ({ route, navigation, ...props }) => {
  const next = () => {
    schoolNetworkCoordinator.gotoNextScreen(route.name);
  };

  return (
    <View style={styles.root}>
      <Screen
        // profile={currentPatient.profile}
        // navigation={navigation}
        style={styles.root}>
        <Header>
          <HeaderText>School network</HeaderText>
          <RegularText style={styles.topText}>
            Link this account to a school anonymously lorem upsum dolor consectume dolor. More information about
            <RegularText style={{ color: colors.purple }}> school networks.</RegularText>
          </RegularText>
        </Header>

        <ProgressBlock>
          <ProgressStatus step={1} maxSteps={3} color={colors.brand} />
        </ProgressBlock>

        <Formik initialValues={{}} validationSchema={{}} onSubmit={(values) => {}}>
          {(formikProps) => {
            return (
              <Form>
                <View style={styles.formContainer}>
                  <View>
                    <View style={{ height: 16 }} />
                    <GenericTextField
                      formikProps={formikProps}
                      placeholder="Enter school name"
                      label="Search for your child's school"
                      name="schoolName"
                      showError
                    />
                    <View style={{ height: 12 }} />
                    <GenericTextField
                      formikProps={formikProps}
                      placeholder="Enter reference number"
                      label="or, enter membership code"
                      name="referenceNo"
                      showError
                    />
                  </View>
                </View>
              </Form>
            );
          }}
        </Formik>
      </Screen>
      <View>
        <View style={{ height: 16 }} />
        <Button onPress={next} branded>
          Done
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
    height: '95%',
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
