import { BrandedButton } from '@covid/components';
import { BackButton } from '@covid/components/BackButton';
import { Dots } from '@covid/components/Dots';
import { edgesDifferentHeaderBg, Screen } from '@covid/components/Screen';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface IProps {
  activeDot?: number;
  headerBgColor?: string;
  buttonOnPress?: () => void;
  buttonTitle?: string;
  children?: React.ReactNode;
  noHeader?: boolean;
  noPadding?: boolean;
  noScrollView?: boolean;
  testID: string;
}

export default function FeatureIntroScreen(props: IProps) {
  function renderHeader() {
    return !props.noHeader || props.activeDot ? (
      <View style={[styles.headerWrapper, props.headerBgColor ? { backgroundColor: props.headerBgColor } : null]}>
        {/* TODO: Checking with Sol on whether to move */}
        {props.activeDot ? (
          <View style={styles.dotWrapper}>
            <Dots activeDot={props.activeDot} amount={3} />
          </View>
        ) : null}
        {props.noHeader ? null : <BackButton />}
      </View>
    ) : null;
  }

  function renderFooter() {
    return (
      <View style={styles.footerWrapper}>
        <BrandedButton
          onPress={props.buttonOnPress}
          style={[styles.button, props.noPadding ? { marginHorizontal: sizes.screenHorizontalPadding } : null]}
          testID={`button-cta-${props.testID || 'screen'}`}
        >
          {props.buttonTitle}
        </BrandedButton>
      </View>
    );
  }

  return (
    <>
      {props.headerBgColor ? (
        <SafeAreaView edges={edgesDifferentHeaderBg} style={{ backgroundColor: props.headerBgColor }} />
      ) : null}
      <Screen
        headerBgColor={props.headerBgColor}
        noPadding={props.noPadding}
        noScrollView={props.noScrollView}
        renderFooter={renderFooter}
        renderHeader={renderHeader}
        testID={props.testID}
      >
        {props.children}
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.darkBlue,
    marginTop: 'auto',
  },
  dotWrapper: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerWrapper: {
    alignSelf: 'center',
    maxWidth: sizes.maxScreenWidth,
    paddingBottom: sizes.screenVerticalPadding,
    paddingHorizontal: sizes.screenHorizontalPadding,
    width: '100%',
  },
  headerWrapper: {
    paddingHorizontal: sizes.screenHorizontalPadding,
    paddingVertical: sizes.screenVerticalPadding,
  },
});
