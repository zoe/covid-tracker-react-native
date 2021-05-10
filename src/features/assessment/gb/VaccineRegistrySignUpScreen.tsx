import { BrandedButton } from '@covid/components';
import PatientHeader from '@covid/components/PatientHeader';
import { Header } from '@covid/components/Screen';
import { HeaderText, RegularText, SecondaryText } from '@covid/components/Text';
import { ScreenParamList } from '@covid/features';
import appCoordinator from '@covid/features/AppCoordinator';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type RenderProps = {
  navigation: StackNavigationProp<ScreenParamList, 'VaccineRegistrySignup'>;
  route: RouteProp<ScreenParamList, 'VaccineRegistrySignup'>;
};

export const VaccineRegistrySignUpScreen: React.FC<RenderProps> = (props) => {
  return (
    <SafeAreaView style={{ backgroundColor: colors.backgroundSecondary, flex: 1 }}>
      <PatientHeader navigation={props.navigation} profile={props.route.params.currentPatient.profile} />

      <ScrollView>
        <View style={styles.contentContainer}>
          <Header>
            <HeaderText style={styles.header}>{i18n.t('vaccine-registry.covid-prevention')}</HeaderText>
          </Header>

          <SecondaryText style={styles.interestedTest}>{i18n.t('vaccine-registry.can-we-contact')}</SecondaryText>

          <View style={styles.buttonContainer}>
            <BrandedButton
              onPress={() => {
                appCoordinator.vaccineRegistryResponse(true);
              }}
              style={styles.yesButton}
            >
              <RegularText style={styles.yesButtonText}>{i18n.t('vaccine-registry.yes')}</RegularText>
            </BrandedButton>

            <BrandedButton
              onPress={() => {
                appCoordinator.vaccineRegistryResponse(false);
              }}
              style={styles.noButton}
            >
              <RegularText style={styles.noButtonText}>{i18n.t('vaccine-registry.no')}</RegularText>
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
  buttonContainer: {
    marginTop: 32,
    width: '100%',
  },
  contentContainer: {
    alignItems: 'center',
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  header: {
    textAlign: 'center',
  },
  interestedTest: {
    marginHorizontal: 16,
    textAlign: 'center',
  },
  interestedTitle: {
    fontSize: 20,
    marginTop: 20,
  },
  noButton: {
    backgroundColor: colors.backgroundTertiary,
    marginHorizontal: 16,
    marginTop: 16,
  },
  noButtonText: {
    color: colors.primary,
  },
  paragraph: {
    marginVertical: 8,
  },
  yesButton: {
    backgroundColor: colors.purple,
    marginHorizontal: 16,
    marginTop: 16,
  },
  yesButtonText: {
    color: colors.white,
  },
});
