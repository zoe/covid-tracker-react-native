import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Formik } from 'formik';
import { Form } from 'native-base';
import * as Yup from 'yup';

import { colors } from '@theme';
import { BrandedButton, HeaderText, RegularText } from '@covid/components/Text';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import Analytics, { events } from '@covid/core/Analytics';
import dietStudyCoordinator from '@covid/core/diet-study/DietStudyCoordinator';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import { IConsentService } from '@covid/core/consent/ConsentService';
import { GenericTextField } from '@covid/components/GenericTextField';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import schoolNetworkCoordinator from '@covid/features/school-network/SchoolNetworkCoordinator';
import { Button } from '@covid/components/Buttons/Button';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'SchoolNetwork'>;
  route: RouteProp<ScreenParamList, 'SchoolNetwork'>;
};

export const SelectSchoolNetworkScreen: React.FC<Props> = ({ route, navigation, ...props }) => {
  const next = () => {
    schoolNetworkCoordinator.gotoNextScreen(route.name);
  };

  return (
    <Screen
    // profile={currentPatient.profile}
    // navigation={navigation}
    >
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

      <Formik
        initialValues={{}}
        // validationSchema={this.registerSchema}
        // onSubmit={(values: LevelOfIsolationScreenData) => {
        //   return this.handleUpdate(values);
        // }}
      >
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
                <View>
                  <View style={{ height: 16 }} />
                  <Button onPress={next} branded>
                    Done
                  </Button>
                  <View style={{ height: 32 }} />
                </View>
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
