import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from 'native-base';
import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Header } from '../../../components/Screen';
import { BrandedButton, HeaderText, RegularText } from '../../../components/Text';
import i18n from '../../../locale/i18n';
import { ScreenParamList } from '../../ScreenParamList';
import { icon } from '../../../../assets';
import { colors } from '../../../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp } from '@react-navigation/native';
import Navigator from '../../Navigation';
import UserService from '../../../core/user/UserService';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'ValidationStudyIntro'>;
  route: RouteProp<ScreenParamList, 'ValidationStudyIntro'>;
};

export default class ValidationStudyIntroScreen extends Component<Props, object> {
  userService = new UserService();

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, marginHorizontal: 16 }}>
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
              this.userService.setValidationStudyResponse(false);
              Navigator.resetToProfileStartAssessment(this.props.route.params.currentPatient);
            }}>
            <RegularText>{i18n.t('validation-study-intro.no')}</RegularText>
          </TouchableOpacity>

          <BrandedButton
            style={styles.mainButton}
            onPress={() => {
              this.props.navigation.navigate('ValidationStudyConsent', {
                viewOnly: false,
                currentPatient: this.props.route.params.currentPatient,
              });
            }}>
            <RegularText style={styles.buttonText}>{i18n.t('validation-study-intro.yes')}</RegularText>
          </BrandedButton>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
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
    marginHorizontal: 16,
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
    marginHorizontal: 16,
    backgroundColor: colors.purple,
  },
  buttonText: {
    color: colors.white,
  },
});
