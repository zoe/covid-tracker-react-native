import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Form } from 'native-base';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import * as Yup from 'yup';
import { Formik, FormikProps } from 'formik';

import { colors } from '@theme';
import { BrandedButton, Header3Text, RegularText, MutedText, ErrorText } from '@covid/components/Text';
import Screen, { Header } from '@covid/components/Screen';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { useInjection } from '@covid/provider/services.hooks';
import { ICoreService } from '@covid/core/user/UserService';
import { Services } from '@covid/provider/services.types';
import dietStudyCoordinator, {
  PRE_LOCKDOWN,
  getScreenHeaderOptions,
} from '@covid/core/diet-study/DietStudyCoordinator';
import { ValidationError } from '@covid/components/ValidationError';
import QuotationMark from '@assets/icons/QuotationMark';
import { sarahBerryAvatar } from '@assets/index';

import { DietChangedQuestion, DietChangedData, DietChangedOption } from './fields/DietChangedQuestion';

interface FormData extends DietChangedData {}

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'DietStudyIntro'>;
  route: RouteProp<ScreenParamList, 'DietStudyIntro'>;
};

export const DietStudyThankYouBreakScreen: React.FC<Props> = ({ route, navigation }) => {
  const userService = useInjection<ICoreService>(Services.User);

  const { currentPatient, recentDietStudyId, timePeriod } = route.params.dietStudyData;
  const { profile } = currentPatient;

  const registerSchema = Yup.object();

  const submit = async (formData: FormData) => {
    if (!!recentDietStudyId && formData.has_diet_changed === DietChangedOption.YES) {
      dietStudyCoordinator.dietStudyParam.dietStudyData.timePeriod = PRE_LOCKDOWN;
    }

    // Important: We need to keep this here for Coordinator to
    // go to the thank you page after 2nd round is completed.
    // Otherwise will be in a loop.
    if (timePeriod === PRE_LOCKDOWN) {
      delete dietStudyCoordinator.dietStudyData.timePeriod;
    }

    dietStudyCoordinator.gotoNextScreen(route.name);
  };

  // style={styles.screen} {...getScreenHeaderOptions(timePeriod)}
  return (
    <Screen profile={profile} navigation={navigation} {...getScreenHeaderOptions(timePeriod)}>
      <Formik
        initialValues={{
          ...DietChangedQuestion.initialFormValues(),
        }}
        validationSchema={registerSchema}
        onSubmit={(values: FormData) => submit(values)}>
        {(props) => {
          return (
            <Form>
              <View style={styles.contentContainer}>
                <View style={styles.textContainer}>
                  <View style={{ alignItems: 'center', marginBottom: 24 }}>
                    <QuotationMark />
                  </View>
                  <Header3Text style={styles.description}>
                    {i18n.t('diet-study.thank-you-break.description')}
                  </Header3Text>
                </View>

                <View style={styles.avatarContainer}>
                  <Image style={styles.avatar} source={sarahBerryAvatar} />
                  <RegularText style={styles.avatarTitle}>
                    {i18n.t('diet-study.thank-you-break.sarah-name')}
                  </RegularText>
                  <MutedText style={styles.avatarDescription}>
                    {i18n.t('diet-study.thank-you-break.sarah-description')}
                  </MutedText>
                </View>
              </View>

              <View style={styles.seperator} />

              <DietChangedQuestion
                formikProps={props as FormikProps<DietChangedData>}
                onValueChanged={() => {
                  submit(props.values);
                }}
              />
            </Form>
          );
        }}
      </Formik>
    </Screen>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    marginHorizontal: 16,
    marginTop: 68,
  },
  description: {
    marginBottom: 24,
    textAlign: 'center',
    color: colors.brand,
  },
  textContainer: {},
  avatarContainer: {
    alignItems: 'center',
    marginTop: 12,
  },
  avatar: {
    borderRadius: 36,
    width: 72,
    height: 72,
  },
  avatarTitle: {
    marginTop: 16,
    marginBottom: 4,
  },
  avatarDescription: {
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
  },

  seperator: {
    height: 1,
    backgroundColor: colors.backgroundFour,
    marginHorizontal: 16,
    marginTop: 64,
    marginBottom: 32,
  },
});
