import { BackButton } from '@covid/components/BackButton';
import { BrandedButton } from '@covid/components/buttons';
import { Dots } from '@covid/components/Dots';
import { Screen } from '@covid/components/Screen';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

interface IProps {
  activeDot?: number;
  buttonOnPress?: () => void;
  buttonTitle?: string;
  children?: React.ReactNode;
  noHeader?: boolean;
  noPadding?: boolean;
  noScrollView?: boolean;
  testID: string;
}

export default function ReconsentScreen(props: IProps) {
  function renderHeader() {
    return !props.noHeader || props.activeDot ? (
      <View style={styles.headerWrapper}>
        {props.noHeader ? null : <BackButton />}
        {props.activeDot ? (
          <View style={styles.dotWrapper}>
            <Dots activeDot={props.activeDot} amount={3} />
          </View>
        ) : null}
      </View>
    ) : null;
  }

  return (
    <Screen
      backgroundColor={colors.backgroundPrimary}
      noPadding={props.noPadding}
      noScrollView={props.noScrollView}
      renderHeader={renderHeader}
      testID={props.testID}
    >
      {props.children}

      {props.buttonOnPress && props.buttonTitle ? (
        <BrandedButton
          onPress={props.buttonOnPress}
          style={styles.button}
          testID={`button-cta-${props.testID || 'screen'}`}
        >
          {props.buttonTitle}
        </BrandedButton>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.purple,
    marginTop: 'auto',
  },
  dotWrapper: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerWrapper: {
    paddingHorizontal: sizes.screenHorizontalPadding,
    paddingVertical: sizes.screenVerticalPadding,
  },
});
