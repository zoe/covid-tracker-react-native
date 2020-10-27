import React, { useEffect, useState } from 'react';
import { PickerItemProps, StyleSheet, TouchableOpacity, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Formik, FormikProps } from 'formik';
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
    schoolId: Yup.string()
      .required('Please enter your school code.')
      .matches(/^[a-zA-Z0-9_-]{7}$/, 'Code contains seven characters'),
  });
};

export const JoinSchoolScreen: React.FC<Props> = ({ route, navigation, ...props }) => {
  const service = useInjection<ISchoolService>(Services.SchoolService);

  const currentPatient = route.params.patientData.patientState;

  return (
    <Screen profile={currentPatient.profile} navigation={navigation} simpleCallout>
      <Header>
        <HeaderText>i18n.t('school-networks.join-school.title')</HeaderText>
        <RegularText style={styles.topText}>
          {i18n.t('school-networks.join-school.description')}
          <RegularText
            style={{ color: colors.purple }}
            passProps={{ onPress: schoolNetworkCoordinator.goToSchoolIntro }}>
            {' '}
            {i18n.t('school-networks.join-school.description-link')}
          </RegularText>
        </RegularText>
      </Header>
      <ProgressBlock>
        <ProgressStatus step={1} maxSteps={3} color={colors.brand} />
      </ProgressBlock>
      <Formik
        initialValues={{ schoolId: '' }}
        validationSchema={validationSchema()}
        onSubmit={async ({ schoolId }, FormikProps) => {
          try {
            // setIsLoading(true);
            const response = await service.getSchoolById(schoolId);
            console.log('** response **');
            console.log(response);
            navigation.goBack();
          } catch (error) {
            await FormikProps.setFieldError('schoolId', 'Incorrect code');
            // setIsLoading(false);
            console.log('*** error ***');
            console.log(error);
          }
        }}>
        {(formikProps) => (
          <Form style={styles.formContainer}>
            <View>
              <View style={{ height: 16 }} />
              <GenericTextField
                formikProps={formikProps}
                placeholder="Enter Code"
                label="Code"
                maxLength={7}
                name="schoolId"
                showError
              />
            </View>
            <View>
              {!!Object.keys(formikProps.errors).length && formikProps.submitCount > 0 && (
                <ValidationError style={{ marginHorizontal: 16 }} error={i18n.t('validation-error-text')} />
              )}
              <Button onPress={formikProps.handleSubmit} branded>
                {i18n.t('school-networks.join-school.cta')}
              </Button>
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
