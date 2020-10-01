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
import dietStudyCoordinator from '@covid/core/diet-study/DietStudyCoordinator';
import QuotationMark from '@assets/icons/QuotationMark';
import { chrisGardnerAvatar, sarahBerryAvatar } from '@assets';
import { isUSCountry } from '@covid/core/localisation/LocalisationService';

interface FormData {}

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'DietStudyIntro'>;
  route: RouteProp<ScreenParamList, 'DietStudyIntro'>;
};

export const DietStudyThankYouBreakScreen: React.FC<Props> = ({ route, navigation }) => {
  const { profile } = route.params.dietStudyData.patientData;

  const registerSchema = Yup.object();

  const submit = async (_: FormData) => {
    dietStudyCoordinator.gotoNextScreen(route.name);
  };

  const avatar = isUSCountry() ? chrisGardnerAvatar : sarahBerryAvatar;

  return (
    <Screen profile={profile} navigation={navigation}>
      <Formik initialValues={{}} validationSchema={registerSchema} onSubmit={(values: FormData) => submit(values)}>
        {(props) => {
          return (
            <Form style={{ flex: 1 }}>
              <View style={styles.contentContainer}>
                <View style={styles.textContainer}>
                  <View style={{ alignItems: 'center', marginBottom: 24 }}>
                    <QuotationMark />
                  </View>
                  <Header3Text style={styles.description}>
                    {i18n.t('diet-study.thank-you-break.description-1')}
                  </Header3Text>
                </View>

                <View style={styles.avatarContainer}>
                  <Image style={styles.avatar} source={avatar} />
                  <RegularText style={styles.avatarTitle}>
                    {i18n.t('diet-study.thank-you-break.sarah-name')}
                  </RegularText>
                  <MutedText style={styles.avatarDescription}>
                    {i18n.t('diet-study.thank-you-break.sarah-description')}
                  </MutedText>
                </View>
              </View>

              <View style={{ flex: 1 }} />

              <RegularText style={styles.bottomText}>{i18n.t('diet-study.thank-you-break.return-later')}</RegularText>

              <BrandedButton onPress={props.handleSubmit} hideLoading={!props.isSubmitting}>
                {i18n.t('diet-study.complete-cta')}
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
    marginTop: 32,
  },
  description: {
    marginBottom: 24,
    textAlign: 'center',
    color: colors.brand,
  },
  bottomText: {
    paddingHorizontal: 12,
    marginBottom: 24,
    textAlign: 'center',
  },
  link: {
    color: colors.brand,
    textDecorationLine: 'underline',
  },
  textContainer: {},
  avatarContainer: {
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 24,
  },
  avatar: {
    width: 144,
    height: 144,
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
  text: {
    textAlign: 'center',
  },
});
