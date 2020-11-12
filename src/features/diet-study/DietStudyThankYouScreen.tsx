import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BrandedButton, HeaderText, RegularText } from '@covid/components/Text';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { colors } from '@theme';
import PatientHeader from '@covid/components/PatientHeader';
import i18n from '@covid/locale/i18n';
import dietStudyCoordinator from '@covid/core/diet-study/DietStudyCoordinator';
import { LoadingModal } from '@covid/components/Loading';
import { ApiErrorState } from '@covid/core/api/ApiServiceErrors';
import { ShareAppCardV2 } from '@covid/components/Cards/ShareAppV2';
import { BigGreenTick } from '@covid/components/BigGreenTick';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'DietStudyThankYou'>;
  route: RouteProp<ScreenParamList, 'DietStudyThankYou'>;
};

export const DietStudyThankYouScreen: React.FC<Props> = (props) => {
  const { profile } = props.route.params.dietStudyData.patientData;
  const [apiError, setApiError] = useState({} as ApiErrorState);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.backgroundSecondary }}>
      {apiError.isApiError && (
        <LoadingModal
          error={apiError.error}
          status={apiError.status}
          onRetry={apiError.onRetry}
          onPress={() => setApiError({ isApiError: false } as ApiErrorState)}
        />
      )}

      <PatientHeader profile={profile!} navigation={props.navigation} />

      <ScrollView style={styles.contentContainer}>
        <View style={{ marginTop: 24 }}>
          <BigGreenTick />
        </View>

        <HeaderText style={styles.headerText}>{i18n.t('diet-study.thank-you.title')}</HeaderText>
        <RegularText style={styles.bodyText}>{i18n.t('diet-study.thank-you.text-1')}</RegularText>

        <View style={{ marginTop: 24 }}>
          <ShareAppCardV2 />
        </View>

        <View style={styles.buttonContainer}>
          <BrandedButton
            style={styles.button}
            onPress={() => {
              dietStudyCoordinator.gotoNextScreen(props.route.name);
            }}>
            <RegularText style={styles.buttonText}>{i18n.t('vaccine-registry.next')}</RegularText>
          </BrandedButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 32,
    flexGrow: 1,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 32,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
  },
  button: {
    marginVertical: 16,
    backgroundColor: colors.purple,
  },
  profileList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    width: '100%',
    alignContent: 'stretch',
  },
  cardContainer: {
    width: '45%',
    marginHorizontal: 8,
    marginVertical: 4,
  },
  backIcon: {
    alignSelf: 'flex-start',
    marginTop: 32,
  },
  headerText: {
    marginTop: 24,
    textAlign: 'center',
  },
  bodyText: {
    marginTop: 24,
    textAlign: 'center',
  },
});
