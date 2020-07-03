import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View, ImageBackground } from 'react-native';

import { icon, studyIntro } from '@assets';
import { colors } from '@theme';
import i18n from '@covid/locale/i18n';
import { ICoreService } from '@covid/core/user/UserService';
import Analytics, { events } from '@covid/core/Analytics';
import { BrandedButton, HeaderText, RegularText } from '@covid/components/Text';
import { Header } from '@covid/components/Screen';
import { lazyInject } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';

import appCoordinator from '../AppCoordinator';
import { ScreenParamList } from '../ScreenParamList';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'ValidationStudyIntro'>;
  route: RouteProp<ScreenParamList, 'ValidationStudyIntro'>;
};

export default class ValidationStudyIntroScreen extends Component<Props, object> {
  @lazyInject(Services.User)
  private userService: ICoreService;

  render() {
    return (
      <View style={styles.backgroundContainer}>
        <ImageBackground source={studyIntro} style={styles.backgroundImage}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.logoContainer}>
              <Image source={icon} style={styles.covidIcon} resizeMode="contain" />
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
                this.userService.setValidationStudyResponse(false);
                appCoordinator.resetToProfileStartAssessment();
              }}>
              <RegularText>{i18n.t('validation-study-intro.no')}</RegularText>
            </TouchableOpacity>

            <BrandedButton
              style={styles.mainButton}
              onPress={() => {
                appCoordinator.gotoNextScreen(this.props.route.name);
              }}>
              <RegularText style={styles.buttonText}>{i18n.t('validation-study-intro.yes')}</RegularText>
            </BrandedButton>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    backgroundColor: colors.white,
    flex: 1,
  },
  backgroundImage: {
    height: '100%',
  },
  covidIcon: {
    height: 64,
    width: 64,
    borderRadius: 12,
  },
  appName: {
    marginVertical: 16,
    color: colors.brand,
  },
  contentContainer: {
    marginHorizontal: 32,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    margin: 24,
  },
  header: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginVertical: 8,
  },
  info: {
    textAlign: 'center',
    marginVertical: 8,
    color: colors.secondary,
    fontSize: 14,
  },
  mainButton: {
    marginTop: 32,
    marginBottom: 32,
    marginHorizontal: 16,
    backgroundColor: colors.purple,
  },
  buttonText: {
    color: colors.white,
  },
});
