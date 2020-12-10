import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { ScreenParamList } from '@covid/features/ScreenParamList';
import { BackButton } from '@covid/components/PatientHeader';
import { BrandedButton, Header3Text, HeaderText, RegularText, SecondaryText } from '@covid/components/Text';
import dietStudyPlaybackCoordinator from '@covid/features/diet-study-playback/DietStudyPlaybackCoordinator';
import { colors } from '@theme';
import { QualityScore } from '@covid/features';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'DietStudyPlaybackYourDiet'>;
  route: RouteProp<ScreenParamList, 'DietStudyPlaybackYourDiet'>;
};

export const DietStudyPlaybackYourDietScreen: React.FC<Props> = ({ route, navigation }) => {
  const coordinator = dietStudyPlaybackCoordinator;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navContainer}>{!!navigation && <BackButton navigation={navigation} />}</View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.rootContainer}>
          <HeaderText style={styles.titleText}>Your Traditional Diet Quality Score</HeaderText>
          <SecondaryText style={styles.subtext}>
            This diet quality score is a measure of how healthy and balanced your diet is.
          </SecondaryText>
          <QualityScore beforeScore={coordinator.dietScore.diet_score} duringScore={coordinator.dietScore.diet_score} />

          <Header3Text style={styles.subtitle}>What does this mean?</Header3Text>

          <RegularText>
            {'A score of 12 and above indicates a healthier diet that includes plenty of fruits, vegetables, fiber-rich foods and oily fish.\n\n' +
              'A lower score indicates a less healthy diet that includes more processed meats, high-sugar foods and fried snacks.\n\n' +
              'This score is a simple way to calculate diet quality for the ‘average’ person. While it provides useful insights on a population level, it assumes everyone responds the same way to food. However, we now know this is not true.'}
          </RegularText>

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
  titleText: {
    marginVertical: 16,
  },
  subtext: {
    marginBottom: 16,
  },
  subtitle: {
    marginVertical: 16,
  },
});
