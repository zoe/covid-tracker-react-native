import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@theme';
import i18n from '@covid/locale/i18n';
import { BrandedButton, HeaderText, RegularText, SecondaryText } from '@covid/components/Text';
import { Header, isAndroid } from '@covid/components/Screen';
import PatientHeader from '@covid/components/PatientHeader';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { BaseShareAppCard, shareApp, shareUrl } from '@covid/components/Cards/BaseShareApp';

import { ScreenParamList } from '../../ScreenParamList';

type RenderProps = {
  navigation: StackNavigationProp<ScreenParamList, 'VaccineRegistryInfo'>;
  route: RouteProp<ScreenParamList, 'VaccineRegistryInfo'>;
};

export const VaccineRegistryInfoScreen: React.FC<RenderProps> = (props) => {
  const shareMessage = i18n.t('share-this-app.message');
  const share = async () => {
    const message = shareMessage + (isAndroid ? ' ' + shareUrl() : ''); // On Android add link to end of message
    shareApp(message);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.backgroundSecondary }}>
      <PatientHeader
        profile={assessmentCoordinator.assessmentData.currentPatient.profile}
        navigation={props.navigation}
      />
      <ScrollView>
        <View style={styles.contentContainer}>
          <Header>
            <HeaderText style={styles.header}>{i18n.t('vaccine-registry.creating-registry')}</HeaderText>
          </Header>

          <RegularText style={styles.interestedTest1}>{i18n.t('vaccine-registry.not-ourselves')}</RegularText>

          <SecondaryText style={styles.interestedTest2}>{i18n.t('vaccine-registry.not-share')}</SecondaryText>

          <BaseShareAppCard
            secondaryText={i18n.t('vaccine-registry.share-text')}
            ctaTitle={i18n.t('vaccine-registry.tell-friends')}
            onSharePress={share}
          />

          <View style={styles.buttonContainer}>
            <BrandedButton
              style={styles.yesButton}
              onPress={() => {
                assessmentCoordinator.gotoNextScreen(props.route.name);
              }}>
              <RegularText style={styles.yesButtonText}>{i18n.t('vaccine-registry.next')}</RegularText>
            </BrandedButton>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 32,
    flexGrow: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 32,
    alignItems: 'center',
  },
  backIcon: {
    alignSelf: 'flex-start',
    marginTop: 32,
  },
  header: {
    marginTop: 24,
    textAlign: 'center',
  },
  paragraph: {
    marginVertical: 8,
  },
  yesButton: {
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: colors.purple,
  },
  noButton: {
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: colors.backgroundTertiary,
  },
  yesButtonText: {
    color: colors.white,
  },
  noButtonText: {
    color: colors.primary,
  },
  interestedTitle: {
    marginTop: 20,
    fontSize: 20,
  },
  interestedTest1: {
    marginVertical: 16,
    textAlign: 'center',
  },
  interestedTest2: {
    marginVertical: 16,
    textAlign: 'center',
  },
});
