import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { ScreenParamList } from '@covid/features/ScreenParamList';
import { BackButton } from '@covid/components/PatientHeader';
import {
  BrandedButton,
  CaptionText,
  ClickableText,
  Header3Text,
  HeaderText,
  RegularText,
  SecondaryText,
} from '@covid/components/Text';
import dietStudyPlaybackCoordinator from '@covid/features/diet-study-playback/DietStudyPlaybackCoordinator';
import { colors, fontStyles } from '@theme';
import {
  dietStudyPlaybackFoodHeader,
  dietStudyPlaybackGlobal1,
  dietStudyPlaybackGlobal2,
  dietStudyPlaybackGlobal3,
} from '@assets';
import { DoctorSpeechCard } from '@covid/features/diet-study-playback/DoctorSpeechCard';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'DietStudyPlaybackDietQuality'>;
  route: RouteProp<ScreenParamList, 'DietStudyPlaybackDietQuality'>;
};

export const DietStudyPlaybackDietQualityScreen: React.FC<Props> = ({ route, navigation }) => {
  const coordinator = dietStudyPlaybackCoordinator;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.rootContainer}>
          <HeaderText style={styles.titleText}>Diet quality impacts our long-term health</HeaderText>
          <SecondaryText style={styles.subtext}>
            {'We have spent our careers studying nutrition because it is central to long-term health.\n\n' +
              'Low diet quality is linked to bad health, including an increased risk of chronic diseases, including type 2 diabetes and heart disease.\n\n' +
              'Many nutrients are needed in appropriate amounts to support long-term health including a well-functioning immune system. That’s why a healthy and varied diet - rather than focusing on single nutrients or supplements - is key.'}
          </SecondaryText>

          <DoctorSpeechCard>
            <Header3Text style={{ marginBottom: 20 }}>
              We have analyzed your diet in two ways to help you understand how your diet can help you maintain
              long-term health.
            </Header3Text>
            <RegularText>
              First we will show you your Traditional Diet Quality Score. We used a scientifically validated method* to
              understand your overall diet quality before and during the pandemic.
            </RegularText>

            {/*TODO OnPress*/}
            <ClickableText style={{ ...fontStyles.bodySmallLight, color: colors.purple }} onPress={() => {}}>
              {'\n'}* Learn more about the Short Form FFQ tool developed by Cleghorn et al. that we used in this blog.
            </ClickableText>
          </DoctorSpeechCard>

          <BrandedButton onPress={() => coordinator.gotoNextScreen(route.name)} style={styles.button}>
            See my Traditional Diet Quality Score
          </BrandedButton>
        </View>
      </ScrollView>
      <Image style={styles.banner} source={dietStudyPlaybackFoodHeader} />
      <View style={styles.navContainer}>{!!navigation && <BackButton navigation={navigation} />}</View>
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
    paddingTop: 200,
  },
  rootContainer: {
    paddingHorizontal: 16,
  },
  navContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 45,
  },
  button: {
    marginTop: 32,
    marginBottom: 8,
    color: colors.brand,
  },
  banner: {
    width: '100%',
    aspectRatio: 1200 / 714,
    height: undefined,
    resizeMode: 'contain',
    position: 'absolute',
    top: 0,
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
