import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { ScreenParamList } from '@covid/features/ScreenParamList';
import { BackButton } from '@covid/components/PatientHeader';
import { BrandedButton, RegularText } from '@covid/components/Text';
import dietStudyPlaybackCoordinator from '@covid/features/diet-study-playback/DietStudyPlaybackCoordinator';
import { colors } from '@theme';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'DietStudyPlaybackIntro'>;
  route: RouteProp<ScreenParamList, 'DietStudyPlaybackIntro'>;
};

const DietStudyPlaybackIntroScreen: React.FC<Props> = ({ route, navigation }) => {
  //const { profile } = route.params.dietStudyData.patientData;
  const coordinator = dietStudyPlaybackCoordinator;

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.rootContainer}>
          <View style={styles.navContainer}>{!!navigation && <BackButton navigation={navigation} />}</View>

          <RegularText>
            Thank you for taking part in what has become the world's largest survey linking diet and COVID. Together
            with 1.5 million other people, you have provided essential feedback. Many scientists are now actively
            investigating the impact of the pandemic on diet and lifestyle, and how diet affects the likelihood and
            severity of getting COVID-19. We’ve put together a report summarizing our initial findings, as well as some
            personalized insights into your own diet based on your survey answers. If you would like to see how the
            pandemic has affected your diet (based on your responses) just click below.
          </RegularText>

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
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },

  rootContainer: {
    padding: 10,
  },

  navContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 8,
  },

  button: {
    color: colors.brand,
  },
});
