import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Form } from 'native-base';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import * as Yup from 'yup';
import { Formik } from 'formik';

import { colors } from '@theme';
import { BrandedButton, Header3Text, MutedText, RegularText } from '@covid/components/Text';
import Screen from '@covid/components/Screen';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import dietStudyCoordinator, {
  getScreenHeaderOptions,
  LAST_4_WEEKS,
  PRE_LOCKDOWN,
} from '@covid/core/diet-study/DietStudyCoordinator';
import QuotationMark from '@assets/icons/QuotationMark';
import { sarahBerryAvatar } from '@assets';

interface FormData {}

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'DietStudyIntro'>;
  route: RouteProp<ScreenParamList, 'DietStudyIntro'>;
};

export const DietStudyThankYouBreakScreen: React.FC<Props> = ({ route, navigation }) => {
  const { currentPatient, timePeriod } = route.params.dietStudyData;
  const { profile } = currentPatient;

  const registerSchema = Yup.object();

  const submit = async (formData: FormData) => {
    if (timePeriod === PRE_LOCKDOWN) {
      delete dietStudyCoordinator.dietStudyData.timePeriod;
    } else if (timePeriod === LAST_4_WEEKS) {
      dietStudyCoordinator.dietStudyParam.dietStudyData.timePeriod = PRE_LOCKDOWN;
    }

    dietStudyCoordinator.gotoNextScreen(route.name);
  };

  return (
    <Screen profile={profile} navigation={navigation} {...getScreenHeaderOptions(timePeriod)}>
      <Formik initialValues={{}} validationSchema={registerSchema} onSubmit={(values: FormData) => submit(values)}>
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

              <BrandedButton onPress={props.handleSubmit} hideLoading={!props.isSubmitting}>
                {i18n.t('diet-study.continue-cta')}
              </BrandedButton>
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
