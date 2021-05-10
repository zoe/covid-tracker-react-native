import { BrandedButton } from '@covid/components';
import { BaseShareAppCard, shareApp, shareUrl } from '@covid/components/Cards/BaseShareApp';
import PatientHeader from '@covid/components/PatientHeader';
import { Header } from '@covid/components/Screen';
import { CaptionText, HeaderText, RegularText } from '@covid/components/Text';
import { ScreenParamList } from '@covid/features';
import appCoordinator from '@covid/features/AppCoordinator';
import i18n from '@covid/locale/i18n';
import { isAndroid } from '@covid/utils/platform';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type RenderProps = {
  navigation: StackNavigationProp<ScreenParamList, 'VaccineRegistryInfo'>;
  route: RouteProp<ScreenParamList, 'VaccineRegistryInfo'>;
};

export const VaccineRegistryInfoScreen: React.FC<RenderProps> = (props) => {
  const shareMessage = i18n.t('share-this-app.message');
  const share = async () => {
    const message = shareMessage + (isAndroid ? ` ${shareUrl()}` : ''); // On Android add link to end of message
    shareApp(message);
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.backgroundSecondary, flex: 1 }}>
      <PatientHeader navigation={props.navigation} profile={props.route.params.currentPatient.profile} />
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
              ctaTitle={i18n.t('vaccine-registry.tell-friends')}
              onSharePress={share}
              primaryText={i18n.t('vaccine-registry.share-title')}
              secondaryText={i18n.t('vaccine-registry.share-text')}
            />
          </View>

          <View style={styles.buttonContainer}>
            <BrandedButton
              onPress={() => {
                appCoordinator.gotoNextScreen(props.route.name);
              }}
              style={styles.button}
            >
              <RegularText style={styles.buttonText}>{i18n.t('vaccine-registry.next')}</RegularText>
            </BrandedButton>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backIcon: {
    alignSelf: 'flex-start',
    marginTop: 32,
  },
  button: {
    backgroundColor: colors.purple,
    marginVertical: 16,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 32,
    width: '100%',
  },
  buttonText: {
    color: colors.white,
  },
  contentContainer: {
    alignItems: 'center',
    flexGrow: 1,
    marginHorizontal: 24,
  },
  header: {
    textAlign: 'center',
  },
  interestedTest1: {
    fontFamily: 'SofiaPro-Light',
    marginHorizontal: 8,
    marginVertical: 12,
    textAlign: 'center',
  },
  interestedTest2: {
    color: colors.primary,
    fontFamily: 'SofiaPro-Light',
    marginBottom: 40,
    marginHorizontal: 8,
    marginTop: 12,
    textAlign: 'center',
  },
  interestedTest3: {
    color: colors.primary,
    fontFamily: 'SofiaPro-Medium',
  },
  interestedTitle: {
    fontSize: 20,
    marginTop: 20,
  },
  paragraph: {
    marginVertical: 8,
  },
  shareCard: {
    marginHorizontal: -10,
  },
});
