import { Text } from '@covid/components';
import { BrandedButton } from '@covid/components/buttons';
import ProgressStatus from '@covid/components/ProgressStatus';
import { Screen } from '@covid/components/Screen';
import { HealthProfileFormBackButton } from '@covid/features/health-profile/components/HealthProfileFormBackButton';
import { THPScreenName } from '@covid/features/health-profile/data/healthProfileQuestions';
import { sizes, styling } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

interface IProps {
  buttonEnabled: boolean;
  buttonOnPress: () => void;
  buttonTitle: string;
  children?: React.ReactNode;
  currentStep: number;
  description: string | null;
  maxSteps: number;
  previousScreen: THPScreenName | 'HPAboutYou' | 'DashboardUK';
  showTooltip?: boolean;
  testID: string;
}

export default function UsualSelfSetupScreen(props: IProps) {
  function renderHeader() {
    return (
      <View style={styles.headerWrapper}>
        {/* TODO: AMEND BACK BUTTON */}
        <HealthProfileFormBackButton previousScreen={props.previousScreen} />
        <View style={styles.textWrapper}>
          {/* TODO: Translation */}
          <Text textClass="h5Light">Set up your Usual Self</Text>
        </View>
      </View>
    );
  }

  function renderFooter() {
    return (
      <View style={styles.topDropShadow}>
        <View style={[styles.footerWrapper, styling.shadow]}>
          <BrandedButton
            enabled={props.buttonEnabled}
            onPress={props.buttonOnPress}
            style={styles.button}
            testID={`button-cta-${props.testID || 'screen'}`}
          >
            {props.buttonTitle}
          </BrandedButton>
        </View>
      </View>
    );
  }

  return (
    <>
      <Screen
        noPadding
        // backgroundColor={colors.backgroundPrimary}
        renderFooter={renderFooter}
        renderHeader={renderHeader}
        testID={props.testID}
      >
        <View style={styles.screenPadding}>
          <>
            <ProgressStatus currentStep={props.currentStep} height={8} maxSteps={props.maxSteps} />

            <View style={styles.marginBottom}>
              {props.description ? (
                <Text style={styles.fontSecondary} textClass="pSmall">
                  {/* {props.description} */}
                  {/* TODO: Translation */}
                  Over the past 6 months have you experienced any of the below symptoms?
                </Text>
              ) : null}
            </View>

            {props.children}
          </>
        </View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.darkBlue,
  },
  fontSecondary: {
    color: colors.secondary,
  },
  footerWrapper: {
    backgroundColor: colors.white,
    marginTop: 'auto',
    paddingBottom: sizes.screenVerticalPadding,
    paddingHorizontal: sizes.screenHorizontalPadding,
    paddingTop: sizes.l,
  },
  headerWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: sizes.screenHorizontalPadding,
    paddingVertical: sizes.screenVerticalPadding,
  },
  marginBottom: {
    marginBottom: sizes.xl,
  },
  screenPadding: {
    paddingHorizontal: sizes.screenHorizontalPadding,
  },
  textWrapper: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topDropShadow: {
    paddingTop: sizes.m,
  },
});
