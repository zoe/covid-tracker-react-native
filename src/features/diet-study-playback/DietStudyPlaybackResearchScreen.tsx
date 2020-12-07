import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { ScreenParamList } from '@covid/features/ScreenParamList';
import { BackButton } from '@covid/components/PatientHeader';
import {
  BrandedButton,
  ClickableText,
  Header3Text,
  HeaderText,
  RegularText,
  SecondaryText,
} from '@covid/components/Text';
import dietStudyPlaybackCoordinator from '@covid/features/diet-study-playback/DietStudyPlaybackCoordinator';
import { colors, fontStyles } from '@theme';
import { fallingFoodBackground } from '@assets';
import { BasicCard } from '@covid/components/Cards/BasicCard';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'DietStudyPlaybackResearch'>;
  route: RouteProp<ScreenParamList, 'DietStudyPlaybackResearch'>;
};

export const DietStudyPlaybackResearchScreen: React.FC<Props> = ({ route, navigation }) => {
  const coordinator = dietStudyPlaybackCoordinator;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navContainer}>{!!navigation && <BackButton navigation={navigation} />}</View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.rootContainer}>
          <HeaderText style={styles.titleText}>Our research in ongoing!</HeaderText>
          <SecondaryText style={styles.subtext}>
            We hope you’ve found these early insights interesting. There is still much to learn. This is the largest
            diet and COVID study in the world, and we are now working hard to understand how diet impacts COVID-19 risk
            and severity.
          </SecondaryText>

          {/*TODO Add dynamic component here*/}

          <Header3Text style={styles.subtitle}>Want more detail?</Header3Text>

          <RegularText>
            If you would like to get into the details behind what we have shared, we have a blog that explains more of
            the science:
          </RegularText>

          {/*TODO OnPress*/}
          <ClickableText style={{ ...fontStyles.bodySmallLight, color: colors.purple }} onPress={() => {}}>
            {'\n\u279D '}The science behind these results
          </ClickableText>

          <BasicCard style={styles.imageCard}>
            <Image style={styles.fallingFoodImage} source={fallingFoodBackground} />

            <View style={{ paddingBottom: 24, paddingHorizontal: 24 }}>
              <Header3Text style={styles.subtitle}>
                Would you like to learn about the latest nutrition research?
              </Header3Text>
              <RegularText>
                We will keep you up-to-date by email with the latest nutritional science, including ZOE’s own
                discoveries. You can opt-out at any time, and will only receive science updates.
              </RegularText>

              {/*TODO OnPress*/}
              <BrandedButton onPress={() => {}} style={styles.moreButton}>
                Yes, I'd love to know more
              </BrandedButton>
            </View>
          </BasicCard>

          <BrandedButton onPress={() => coordinator.gotoNextScreen(route.name)} style={styles.nextButton}>
            Finish
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
  nextButton: {
    marginTop: 32,
    marginBottom: 8,
    color: colors.brand,
  },
  moreButton: {
    marginTop: 8,
    color: colors.brand,
  },
  fallingFoodImage: {
    width: '100%',
    aspectRatio: 1200 / 584,
    height: undefined,
    resizeMode: 'contain',
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
    marginTop: 40,
    padding: 0,
    borderRadius: 20,
  },
});
