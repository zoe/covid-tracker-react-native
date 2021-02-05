import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import i18n from 'i18n-js';

import { ScreenParamList } from '@covid/features/ScreenParamList';
import { BackButton } from '@covid/components/PatientHeader';
import {
  BrandedButton,
  CaptionText,
  Header3Text,
  HeaderText,
  RegularText,
  SecondaryText,
} from '@covid/components/Text';
import dietStudyPlaybackCoordinator from '@covid/features/diet-study-playback/DietStudyPlaybackCoordinator';
import { colors } from '@theme';
import { BasicCard } from '@covid/components/Cards/BasicCard';
import {
  dietStudyPlaybackGlobal1,
  dietStudyPlaybackGlobal2,
  dietStudyPlaybackGlobal3,
  doctorsAvatars,
  QuoteMarks,
  sarahAvatar,
} from '@assets';
import { DoctorSpeechCard } from '@covid/features/diet-study-playback/DoctorSpeechCard';
import { isUSCountry } from '@covid/core/localisation/LocalisationService';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'DietStudyPlaybackIntro'>;
  route: RouteProp<ScreenParamList, 'DietStudyPlaybackIntro'>;
};

const SarahIntro = () => (
  <>
    <Image style={[introStyles.avatar, introStyles.sarahAvatar]} source={sarahAvatar} />
    <RegularText style={introStyles.namesText}>Dr Sarah Berry</RegularText>
    <CaptionText style={introStyles.uniText}>{"Nutritional Scientist\nKing's College London"}</CaptionText>
  </>
);

const DoctorsIntro = () => (
  <>
    <Image style={[introStyles.avatar, introStyles.doctorsAvatar]} source={doctorsAvatars} />
    <RegularText style={introStyles.namesText}>{'Dr Sarah Berry\n& Prof Christopher Gardner'}</RegularText>
    <CaptionText style={introStyles.uniText}>
      {"Nutritional Scientists\nKing's College London & Stanford University"}
    </CaptionText>
  </>
);

const introStyles = StyleSheet.create({
  avatar: {
    resizeMode: 'contain',
    height: undefined,
    marginTop: 16,
  },
  sarahAvatar: {
    width: 100,
    aspectRatio: 1.0,
  },
  doctorsAvatar: {
    width: 170,
    aspectRatio: 1.8,
  },
  namesText: {
    marginVertical: 8,
    marginHorizontal: 4,
    color: colors.textDark,
  },
  uniText: {
    marginBottom: 16,
    marginHorizontal: 4,
    color: colors.secondary,
  },
});

export const DietStudyPlaybackIntroScreen: React.FC<Props> = ({ route, navigation }) => {
  const coordinator = dietStudyPlaybackCoordinator;
  const IntroCard = isUSCountry() ? DoctorsIntro() : SarahIntro();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navContainer}>{!!navigation && <BackButton navigation={navigation} />}</View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.rootContainer}>
          {IntroCard}

          <BasicCard style={[{ marginBottom: 24 }, styles.boxShadow]}>
            <View style={styles.quoteIcon}>
              <QuoteMarks />
            </View>
            <Header3Text style={{ marginBottom: 24 }}>
              We are excited to share our insights on how diets have changed during the pandemic.
            </Header3Text>
            <SecondaryText style={{ marginBottom: 16 }}>
              Thank you for taking part in what has become the world's largest survey linking diet and COVID.
            </SecondaryText>
          </BasicCard>

          <View style={{ paddingHorizontal: 8 }}>
            <HeaderText style={styles.titleText}>Global diet changes during the pandemic</HeaderText>
            <SecondaryText style={styles.subtext}>
              From 1.5 million app users surveyed across the US and the UK, we saw that the pandemic has affected our
              diets very differently.
            </SecondaryText>
            <Header3Text style={styles.subtitle}>
              4 in 10 people changed their diet quality during the pandemic.
            </Header3Text>
            <Image style={styles.infoCards} source={dietStudyPlaybackGlobal1} />
            <Header3Text style={styles.subtitle}>Some people increased their alcohol consumption.</Header3Text>
            <Image style={styles.infoCards} source={dietStudyPlaybackGlobal2} />
            <Header3Text style={styles.subtitle}>
              More people increased their fruit and vegetable intake than decreased it.
            </Header3Text>
            <Image style={styles.infoCards} source={dietStudyPlaybackGlobal3} />
            <Header3Text style={styles.subtitle}>What could explain these changes?</Header3Text>
            <RegularText>
              {'Research shows many things can influence diet and lifestyle changes during the pandemic, including:\n'}
            </RegularText>
            <View style={{ flexDirection: 'row', paddingLeft: 8 }}>
              <RegularText>{'\u2022'}</RegularText>
              <RegularText style={{ flex: 1, paddingLeft: 8 }}>
                {'Changing socio-economic factors like income and employment\n'}
              </RegularText>
            </View>
            <View style={{ flexDirection: 'row', paddingLeft: 8 }}>
              <RegularText>{'\u2022'}</RegularText>
              <RegularText style={{ flex: 1, paddingLeft: 8 }}>{'Increased stress and anxiety\n'}</RegularText>
            </View>
            <View style={{ flexDirection: 'row', paddingLeft: 8 }}>
              <RegularText>{'\u2022'}</RegularText>
              <RegularText style={{ flex: 1, paddingLeft: 8 }}>
                Food security including access and availability of healthier foods
              </RegularText>
            </View>
          </View>

          <DoctorSpeechCard>
            <Header3Text style={{ marginBottom: 20 }}>
              Now, let’s see how the pandemic has affected your diet.
            </Header3Text>
          </DoctorSpeechCard>

          <BrandedButton onPress={() => coordinator.gotoNextScreen(route.name)} style={styles.button}>
            {i18n.t('diet-scores.intro.next')}
          </BrandedButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'white',
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  rootContainer: {
    paddingHorizontal: 16,
  },
  navContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatar: {
    resizeMode: 'contain',
    height: undefined,
    width: 170,
    marginTop: 16,
    aspectRatio: 1.8,
  },
  namesText: {
    marginVertical: 8,
    marginHorizontal: 4,
    color: colors.textDark,
  },
  uniText: {
    marginBottom: 16,
    marginHorizontal: 4,
    color: colors.secondary,
  },
  button: {
    backgroundColor: colors.darkblue,
    marginTop: 32,
    marginBottom: 8,
    color: colors.brand,
  },
  quoteIcon: {
    marginVertical: 16,
  },
  infoCards: {
    width: '100%',
    aspectRatio: 1200 / 1270,
    height: undefined,
    resizeMode: 'contain',
    marginBottom: 48,
  },
  titleText: {
    marginVertical: 16,
  },
  subtext: {
    marginBottom: 16,
  },
  subtitle: {
    marginVertical: 16,
  },
  boxShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
});
