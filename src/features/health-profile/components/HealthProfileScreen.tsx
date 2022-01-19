import { LabelText, LightText, Text } from '@covid/components';
import { BackButton } from '@covid/components/BackButton';
import { BrandedButton } from '@covid/components/buttons';
import ProgressStatus from '@covid/components/ProgressStatus';
import { Screen } from '@covid/components/Screen';
import i18n from '@covid/locale/i18n';
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
  description?: string;
  noBackButton?: boolean;
  hideWhyWeAskLink?: boolean;
  testID: string;
  title: string;
}

// TODO: Make max steps dynamic depending on sex
const MAX_STEPS = 16;

export default function HealthProfileScreen(props: IProps) {
  function renderHeader() {
    return (
      <View style={styles.bottomDropShadow}>
        <View style={[styles.headerWrapper, styling.shadow]}>
          <View style={styles.flex}>{props.noBackButton ? null : <BackButton />}</View>
          <View style={styles.flex}>
            <LabelText style={styles.center}>
              {props.currentStep} / {MAX_STEPS}
            </LabelText>
          </View>
          <View style={styles.flex}>
            {/* TODO: Add onPress handler */}
            <LightText style={styles.right}>{i18n.t('health-profile.save-exit')}</LightText>
          </View>
        </View>
      </View>
    );
  }

  // TODO: Check disabled button style
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
    <Screen
      noPadding
      backgroundColor={colors.backgroundPrimary}
      renderFooter={renderFooter}
      renderHeader={renderHeader}
      testID={props.testID}
    >
      <View style={styles.screenPadding}>
        <ProgressStatus currentStep={props.currentStep} height={8} maxSteps={MAX_STEPS} />

        <Text style={styles.title} textClass="h3Light">
          {props.title}
        </Text>

        <View style={styles.marginBottom}>
          {props.description ? (
            <Text style={styles.fontSecondary} textClass="pSmall">
              {props.description}
            </Text>
          ) : null}

          {props.hideWhyWeAskLink ? null : (
            <Text style={styles.fontSecondary} textClass="pSmall" textDecorationLine="underline">
              {i18n.t('health-profile.why-we-ask-this')}
            </Text>
          )}
        </View>

        {props.children}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  bottomDropShadow: {
    overflow: 'hidden',
    paddingBottom: sizes.m,
  },
  button: {
    backgroundColor: colors.darkBlue,
  },
  center: {
    textAlign: 'center',
  },
  flex: {
    flex: 1,
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
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: sizes.screenHorizontalPadding,
    paddingVertical: sizes.screenVerticalPadding,
  },
  marginBottom: {
    marginBottom: sizes.l,
  },
  right: {
    textAlign: 'right',
  },
  screenPadding: {
    paddingHorizontal: sizes.screenHorizontalPadding,
  },
  title: {
    color: colors.black,
    marginBottom: sizes.m,
    marginTop: sizes.l,
  },
  topDropShadow: {
    overflow: 'hidden',
    paddingTop: sizes.m,
  },
  underline: {
    textDecorationLine: 'underline',
  },
});
