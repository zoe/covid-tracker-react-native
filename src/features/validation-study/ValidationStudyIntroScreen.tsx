import { icon, studyIntro } from '@assets';
import { BrandedButton } from '@covid/components';
import { Header } from '@covid/components/Screen';
import { HeaderText, RegularText } from '@covid/components/Text';
import Analytics, { events } from '@covid/core/Analytics';
import { IConsentService } from '@covid/core/consent/ConsentService';
import appCoordinator from '@covid/features/AppCoordinator';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { lazyInject } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import React, { Component } from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'ValidationStudyIntro'>;
  route: RouteProp<ScreenParamList, 'ValidationStudyIntro'>;
};

export default class ValidationStudyIntroScreen extends Component<Props, object> {
  @lazyInject(Services.Consent)
  private readonly consentService: IConsentService;

  render() {
    return (
      <View style={styles.backgroundContainer}>
        <ImageBackground source={studyIntro} style={styles.backgroundImage}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.logoContainer}>
              <Image resizeMode="contain" source={icon} style={styles.covidIcon} />
              <RegularText style={styles.appName}>{i18n.t('validation-study-intro.app-name')}</RegularText>
            </View>

            <Header>
              <HeaderText style={styles.header}>{i18n.t('validation-study-intro.title')}</HeaderText>
            </Header>

            <RegularText style={styles.subtitle}>{i18n.t('validation-study-intro.subtitle')}</RegularText>
            <RegularText style={styles.info}>{i18n.t('validation-study-intro.info')}</RegularText>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                Analytics.track(events.DECLINE_STUDY);
                this.consentService.setValidationStudyResponse(false);
                appCoordinator.resetToProfileStartAssessment();
              }}
            >
              <RegularText>{i18n.t('validation-study-intro.no')}</RegularText>
            </TouchableOpacity>
          </View>

          <BrandedButton
            onPress={() => {
              appCoordinator.gotoNextScreen(this.props.route.name);
            }}
            style={styles.mainButton}
          >
            <RegularText style={styles.buttonText}>{i18n.t('validation-study-intro.yes')}</RegularText>
          </BrandedButton>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appName: {
    color: colors.brand,
    marginVertical: 16,
  },
  backgroundContainer: {
    backgroundColor: colors.white,
    flex: 1,
  },
  backgroundImage: {
    height: '100%',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
  },
  contentContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    marginHorizontal: 32,
  },
  covidIcon: {
    borderRadius: 12,
    height: 64,
    width: 64,
  },
  header: {
    textAlign: 'center',
  },
  info: {
    color: colors.secondary,
    fontSize: 14,
    marginVertical: 8,
    textAlign: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    margin: 24,
  },
  mainButton: {
    alignSelf: 'center',
    backgroundColor: colors.purple,
    marginBottom: 32,
    marginTop: 16,
    width: '60%',
  },
  subtitle: {
    marginVertical: 8,
    textAlign: 'center',
  },
});
