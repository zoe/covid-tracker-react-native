import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { ScreenParamList } from '@covid/features/ScreenParamList';
import { BackButton } from '@covid/components/PatientHeader';
import { BrandedButton, CaptionText, Header3Text, MutedText, RegularText, SecondaryText } from '@covid/components/Text';
import dietStudyPlaybackCoordinator from '@covid/features/diet-study-playback/DietStudyPlaybackCoordinator';
import { colors } from '@theme';
import { BasicCard } from '@covid/components/Cards/BasicCard';
import { doctorsAvatars, QuoteMarks } from '@assets';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'DietStudyPlaybackIntro'>;
  route: RouteProp<ScreenParamList, 'DietStudyPlaybackIntro'>;
};

const DietStudyPlaybackIntroScreen: React.FC<Props> = ({ route, navigation }) => {
  const coordinator = dietStudyPlaybackCoordinator;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navContainer}>{!!navigation && <BackButton navigation={navigation} />}</View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.rootContainer}>
          <Image style={styles.avatar} source={doctorsAvatars} />
          <RegularText style={styles.namesText}>{'Dr Sarah Berry\n& Prof Christopher Gardner'}</RegularText>
          <CaptionText style={styles.uniText}>
            {"Nutrional Scientists\nKing's College London & Stanford University"}
          </CaptionText>

          <BasicCard>
            <View style={styles.quoteIcon}>
              <QuoteMarks />
            </View>
            <Header3Text style={{ marginBottom: 20 }}>
              We are excited to share our insights on how diets have changed during the pandemic.
            </Header3Text>
            <SecondaryText>
              {"Thank you for taking part in what has become the world's largest survey linking diet and COVID. Together with 1.5 million other people, you have provided essential feedback. Many scientists are now actively investigating the impact of the pandemic on diet and lifestyle, and how diet affects the likelihood and severity of getting COVID-19.\n\n" +
                'We’ve put together a report summarizing our initial findings, as well as some personalized insights into your own diet based on your survey answers.\n\n' +
                'If you would like to see how the pandemic has affected your diet (based on your responses) just click below.'}
            </SecondaryText>
          </BasicCard>

          <BrandedButton onPress={() => coordinator.gotoNextScreen(route.name)} style={styles.button}>
            Get started
          </BrandedButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DietStudyPlaybackIntroScreen;

const styles = StyleSheet.create({
  safeArea: {
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
    marginTop: 32,
    marginBottom: 8,
    color: colors.brand,
  },
  quoteIcon: {
    marginVertical: 16,
  },
});
