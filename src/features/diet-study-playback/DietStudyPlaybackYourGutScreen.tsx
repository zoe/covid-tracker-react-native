import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { ScreenParamList } from '@covid/features/ScreenParamList';
import { BackButton } from '@covid/components/PatientHeader';
import { BrandedButton, Header3Text, HeaderText, RegularText, SecondaryText } from '@covid/components/Text';
import dietStudyPlaybackCoordinator from '@covid/features/diet-study-playback/DietStudyPlaybackCoordinator';
import { colors } from '@theme';
import { DoctorSpeechCard } from '@covid/features/diet-study-playback/DoctorSpeechCard';
import { GutScore } from '@covid/features';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'DietStudyPlaybackYourGut'>;
  route: RouteProp<ScreenParamList, 'DietStudyPlaybackYourGut'>;
};

export const DietStudyPlaybackYourGutScreen: React.FC<Props> = ({ route, navigation }) => {
  const coordinator = dietStudyPlaybackCoordinator;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navContainer}>{!!navigation && <BackButton navigation={navigation} />}</View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.rootContainer}>
          <HeaderText style={styles.titleText}>Your Gut Friendly Diet Score</HeaderText>
          <SecondaryText style={styles.subtext}>
            This score measures the ratio of gut ‘friendly’ to gut ‘unfriendly’ foods.
          </SecondaryText>

          <GutScore
            beforeScore={coordinator.dietScore.gut_friendly_score}
            duringScore={coordinator.dietScore.gut_friendly_score}
          />

          <Header3Text style={styles.subtitle}>What does this mean?</Header3Text>

          <RegularText>
            {'A better score suggests your diet contains more gut ‘friendly’ foods, which are associated with a higher number and diversity of ‘healthy’ gut microbes.\n\n' +
              'A worse score suggests your diet includes more gut ‘unfriendly’ foods, which are associated with a lower number and diversity of ‘healthy’ gut microbes.\n\n' +
              'Please remember, the Gut Friendly Diet Score estimates your gut microbiome quality based on your survey responses, but we cannot know the true state of your microbiome without measuring it.'}
          </RegularText>

          <DoctorSpeechCard>
            <Header3Text style={{ marginBottom: 20 }}>
              Here are some easy tips to improve your Gut Friendly Diet Score
            </Header3Text>
            <RegularText>
              {'Seek variety - try to add 30 or more different types of plants to your diet each week.\n\n' +
                'Fiber is fundamental - choose fiber-rich foods like wholegrains, beans, pulses, fruit, vegetables, nuts and seeds.\n\n' +
                'Include fermented foods such as kefir, kimchi and sauerkraut that contain beneficial probiotic bacteria.'}
            </RegularText>
          </DoctorSpeechCard>

          <BrandedButton onPress={() => coordinator.gotoNextScreen(route.name)} style={styles.button}>
            Next
          </BrandedButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.backgroundPrimary,
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
  button: {
    marginTop: 32,
    marginBottom: 8,
    color: colors.brand,
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
  imageCard: {
    padding: 0,
    borderRadius: 20,
  },
});
