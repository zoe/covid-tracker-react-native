import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@theme';
import i18n from '@covid/locale/i18n';
import { BrandedButton, HeaderText, RegularText, SecondaryText } from '@covid/components/Text';
import { Header } from '@covid/components/Screen';
import PatientHeader from '@covid/components/PatientHeader';
import appCoordinator from '@covid/features/AppCoordinator';

import { ScreenParamList } from '../../ScreenParamList';

type RenderProps = {
  navigation: StackNavigationProp<ScreenParamList, 'VaccineRegistrySignup'>;
  route: RouteProp<ScreenParamList, 'VaccineRegistrySignup'>;
};

export const VaccineRegistrySignUpScreen: React.FC<RenderProps> = (props) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.backgroundSecondary }}>
      <PatientHeader profile={props.route.params.currentPatient.profile} navigation={props.navigation} />

      <ScrollView>
        <View style={styles.contentContainer}>
          <Header>
            <HeaderText style={styles.header}>{i18n.t('vaccine-registry.covid-prevention')}</HeaderText>
          </Header>

          <SecondaryText style={styles.interestedTest}>{i18n.t('vaccine-registry.can-we-contact')}</SecondaryText>

          <View style={styles.buttonContainer}>
            <BrandedButton
              style={styles.yesButton}
              onPress={() => {
                appCoordinator.vaccineRegistryResponse(true);
              }}>
              <RegularText style={styles.yesButtonText}>{i18n.t('vaccine-registry.yes')}</RegularText>
            </BrandedButton>

            <BrandedButton
              style={styles.noButton}
              onPress={() => {
                appCoordinator.vaccineRegistryResponse(false);
              }}>
              <RegularText style={styles.noButtonText}>{i18n.t('vaccine-registry.no')}</RegularText>
            </BrandedButton>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
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
  interestedTest: {
    marginHorizontal: 16,
    textAlign: 'center',
  },
});
