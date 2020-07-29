import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@theme';
import i18n from '@covid/locale/i18n';
import { BrandedButton, HeaderText, RegularText, CaptionText } from '@covid/components/Text';
import { Header, isAndroid } from '@covid/components/Screen';
import PatientHeader from '@covid/components/PatientHeader';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { BaseShareAppCard, shareApp, shareUrl } from '@covid/components/Cards/BaseShareApp';
import appCoordinator from '@covid/features/AppCoordinator';

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
      <PatientHeader profile={props.route.params.currentPatient.profile} navigation={props.navigation} />
      <ScrollView>
        <View style={styles.contentContainer}>
          <Header>
            <HeaderText style={styles.header}>{i18n.t('vaccine-registry.creating-registry')}</HeaderText>
          </Header>

          <RegularText style={styles.interestedTest1}>{i18n.t('vaccine-registry.not-ourselves')}</RegularText>

          <CaptionText style={styles.interestedTest2}>
            {i18n.t('vaccine-registry.not-share')}{' '}
            <CaptionText style={styles.interestedTest3}>{i18n.t('vaccine-registry.prioritise')}</CaptionText>
          </CaptionText>

          <View style={styles.shareCard}>
            <BaseShareAppCard
              primaryText={i18n.t('vaccine-registry.share-title')}
              secondaryText={i18n.t('vaccine-registry.share-text')}
              ctaTitle={i18n.t('vaccine-registry.tell-friends')}
              onSharePress={share}
            />
          </View>

          <View style={styles.buttonContainer}>
            <BrandedButton
              style={styles.button}
              onPress={() => {
                appCoordinator.gotoNextScreen(props.route.name);
              }}>
              <RegularText style={styles.buttonText}>{i18n.t('vaccine-registry.next')}</RegularText>
            </BrandedButton>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    marginHorizontal: 24,
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
    textAlign: 'center',
  },
  paragraph: {
    marginVertical: 8,
  },
  button: {
    marginVertical: 16,
    backgroundColor: colors.purple,
  },
  buttonText: {
    color: colors.white,
  },
  interestedTitle: {
    marginTop: 20,
    fontSize: 20,
  },
  interestedTest1: {
    marginHorizontal: 8,
    marginVertical: 12,
    textAlign: 'center',
    fontWeight: '300',
  },
  interestedTest2: {
    marginHorizontal: 8,
    marginTop: 12,
    marginBottom: 40,
    textAlign: 'center',
    fontWeight: '300',
    color: colors.primary,
  },
  interestedTest3: {
    fontWeight: '500',
    color: colors.primary,
  },
  shareCard: {
    marginHorizontal: -10,
  },
});
