import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { ScreenParamList } from '@covid/features/ScreenParamList';
import { BackButton } from '@covid/components/PatientHeader';
import {
  BrandedButton,
  Header3Text,
  HeaderText,
  RegularText,
  SecondaryText,
} from '@covid/components/Text';
import dietStudyPlaybackCoordinator from '@covid/features/diet-study-playback/DietStudyPlaybackCoordinator';
import { colors } from '@theme';
import { dietStudyPlaybackGutDiagram, dietStudyPlaybackGutHeader } from '@assets';
import { DoctorSpeechCard } from '@covid/features/diet-study-playback/DoctorSpeechCard';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'DietStudyPlaybackGutHealth'>;
  route: RouteProp<ScreenParamList, 'DietStudyPlaybackGutHealth'>;
};

export const DietStudyPlaybackGutHealthScreen: React.FC<Props> = ({ route, navigation }) => {
  const coordinator = dietStudyPlaybackCoordinator;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.rootContainer}>
          <HeaderText style={styles.titleText}>Let’s go one step further & dive into gut health</HeaderText>
          <SecondaryText style={styles.subtext}>
            {'Your gut contains trillions of microbes - known as the gut microbiome. The latest scientific research shows that these microbes play a big role in our health, affecting our immune system and even weight gain.\n\n' +
              'In fact, research now shows that your gut health, diet and long-term health are all interlinked:'}
          </SecondaryText>

          <Image style={styles.diagram} source={dietStudyPlaybackGutDiagram} />

          <Header3Text style={{ marginBottom: 20 }}>Your gut microbiome is unique</Header3Text>
          <RegularText>
            {'Your unique microbiome helps to explain why each of us responds differently to food, and there is no single ‘best diet’ for us all.\n\n' +
              'The good news is that you can change your gut microbiome by changing what you eat. Some foods are better for ‘good’ microbes, while other foods are linked to ‘bad’ microbes that are associated with poorer health.'}
          </RegularText>

          <DoctorSpeechCard>
            <Header3Text style={{ marginBottom: 20 }}>
              We collaborated with leading researchers to bring you the first ever version of the Gut Friendly Diet
              Score.
            </Header3Text>
            <RegularText>
              {'This personalized score was specifically designed to measure the ratio of gut ‘friendly’ foods to gut ‘unfriendly’ foods.\n\n' +
                'The Gut Friendly Diet Score can help you understand how your diet quality might impact the health of your gut microbiome.'}
            </RegularText>
          </DoctorSpeechCard>

          <BrandedButton onPress={() => coordinator.gotoNextScreen(route.name)} style={styles.button}>
            See my Gut Friendly Diet Score
          </BrandedButton>
        </View>
      </ScrollView>
      <Image style={styles.banner} source={dietStudyPlaybackGutHeader} />
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
  diagram: {
    width: '100%',
    aspectRatio: 1200 / 1270,
    height: undefined,
    resizeMode: 'contain',
    marginBottom: 48,
  },
});
