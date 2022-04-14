import { Tag, Text, TextWithHighlight } from '@covid/components';
import { BrandedButton } from '@covid/components/buttons';
import ProgressStatus from '@covid/components/ProgressStatus';
import { Screen } from '@covid/components/Screen';
import { UsualSelfFormBackButton } from '@covid/features/usual-self/components/UsualSelfFormBackButton';
import { TUsualSelfSetupScreenName } from '@covid/features/usual-self/data/types';
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
  description: string | null;
  maxSteps: number;
  previousScreen: TUsualSelfSetupScreenName | 'UsualSelfReportsSymptoms';
  category: string;
  testID: string;
}

export default function UsualSelfSetupScreen(props: IProps) {
  function renderHeader() {
    return (
      <View style={styles.headerWrapper}>
        <View style={styles.textWrapper}>
          <Text textClass="h5Light">{i18n.t('usual-self.setup.title')}</Text>
        </View>
        <UsualSelfFormBackButton previousScreen={props.previousScreen} />
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
        isInsideTabBar
        noPadding
        backgroundColor={colors.whiteWithDropShadow}
        renderFooter={renderFooter}
        renderHeader={renderHeader}
        testID={props.testID}
      >
        <View style={styles.screenPadding}>
          <>
            <ProgressStatus
              borderRadius={6}
              color={colors.darkBlue}
              currentStep={props.currentStep}
              height={12}
              maxSteps={props.maxSteps}
            />

            <Tag color={colors.lightBlueBrand} style={styles.tag} text={i18n.t('usual-self.past-6-months')} />

            <TextWithHighlight color={colors.purple} query={props.category} rhythm={32} textClass="h4Medium">
              {props.description}
            </TextWithHighlight>

            <Text inverted colorPalette="uiDark" colorShade="dark" rhythm={8} textClass="pSmall">
              {i18n.t('usual-self.check-all-apply')}
            </Text>

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
  description: {
    color: colors.secondary,
    marginBottom: sizes.xl,
    marginTop: sizes.s,
  },
  footerWrapper: {
    backgroundColor: colors.white,
    paddingBottom: sizes.xxl,
    paddingHorizontal: sizes.screenHorizontalPadding,
    paddingTop: sizes.l,
  },
  headerWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: sizes.m,
    paddingHorizontal: sizes.screenHorizontalPadding,
    paddingTop: sizes.m,
  },
  screenPadding: {
    paddingHorizontal: sizes.screenHorizontalPadding,
  },
  tag: {
    alignSelf: 'flex-start',
    marginBottom: sizes.s,
    marginTop: sizes.l,
  },
  textWrapper: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topDropShadow: {
    overflow: 'hidden',
    paddingTop: sizes.m,
  },
});
