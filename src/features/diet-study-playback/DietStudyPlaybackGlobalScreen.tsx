import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { ScreenParamList } from '@covid/features/ScreenParamList';
import { BackButton } from '@covid/components/PatientHeader';
import { BrandedButton, Header3Text, HeaderText, RegularText, SecondaryText } from '@covid/components/Text';
import dietStudyPlaybackCoordinator from '@covid/features/diet-study-playback/DietStudyPlaybackCoordinator';
import { colors } from '@theme';
import { dietStudyPlaybackGlobal1, dietStudyPlaybackGlobal2, dietStudyPlaybackGlobal3 } from '@assets';
import { DoctorSpeechCard } from '@covid/features/diet-study-playback/DoctorSpeechCard';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'DietStudyPlaybackGlobal'>;
  route: RouteProp<ScreenParamList, 'DietStudyPlaybackGlobal'>;
};

export const DietStudyPlaybackGlobalScreen: React.FC<Props> = ({ route, navigation }) => {
  const coordinator = dietStudyPlaybackCoordinator;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navContainer}>{!!navigation && <BackButton navigation={navigation} />}</View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.rootContainer}>
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

          <DoctorSpeechCard>
            <Header3Text style={{ marginBottom: 20 }}>
              Now, let’s see how the pandemic has affected your diet.
            </Header3Text>
          </DoctorSpeechCard>

          <BrandedButton onPress={() => coordinator.gotoNextScreen(route.name)} style={styles.button}>
            See your personal insights
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
});
