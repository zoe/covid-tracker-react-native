import { SafeLayout, Text } from '@covid/components';
import { BrandedButton } from '@covid/components/buttons';
import ChevronLeft from '@covid/features/reconsent/components/ChevronLeft';
import { grid } from '@covid/themes';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import * as React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

interface IProps {
  activeDot?: number;
  buttonOnPress?: () => void;
  buttonTitle?: string;
  children?: React.ReactNode;
  hideBackButton?: boolean;
  noPadding?: boolean;
  secondaryButtonOnPress?: () => void;
  secondaryButtonTitle?: string;
}

const DOT_SIZE = 8;
const AMOUNT_DOTS = 3;

const dots = Array(AMOUNT_DOTS)
  .fill(null)
  .map((_, i) => i);

const hitSlop = {
  bottom: 12,
  left: 12,
  right: 12,
  top: 12,
};

export default function ReconsentScreen(props: IProps) {
  const navigation = useNavigation();

  return (
    <SafeLayout style={styles.safeLayout}>
      <View style={styles.headerWrapper}>
        {props.hideBackButton ? null : (
          <TouchableOpacity hitSlop={hitSlop} onPress={navigation.goBack}>
            <ChevronLeft />
          </TouchableOpacity>
        )}
        {props.activeDot ? (
          <View pointerEvents="none" style={styles.dotsWrapper}>
            {dots.map((_, index) => (
              <View
                // eslint-disable-next-line react/no-array-index-key
                key={`dot-${index}`}
                style={[
                  index > 0 && styles.marginLeft,
                  index + 1 === props.activeDot ? styles.dotActive : styles.dotInactive,
                ]}
              />
            ))}
          </View>
        ) : null}
      </View>
      <ScrollView contentContainerStyle={props.noPadding ? styles.contentContainer : styles.contentContainerPadding}>
        {props.children}

        {props.buttonOnPress && props.buttonTitle ? (
          <BrandedButton onPress={props.buttonOnPress} style={styles.button}>
            {props.buttonTitle}
          </BrandedButton>
        ) : null}
        {props.secondaryButtonOnPress && props.secondaryButtonTitle ? (
          <TouchableOpacity onPress={props.secondaryButtonOnPress} style={styles.secondaryButton}>
            <Text
              inverted
              colorPalette="uiDark"
              colorShade="dark"
              textAlign="center"
              textClass="pLight"
              textDecorationLine="underline"
            >
              {props.secondaryButtonTitle}
            </Text>
          </TouchableOpacity>
        ) : null}
      </ScrollView>
    </SafeLayout>
  );
}

const dotStyle: ViewStyle = {
  borderRadius: DOT_SIZE / 2,
  height: DOT_SIZE,
  width: DOT_SIZE,
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.purple,
    marginTop: 'auto',
  },
  contentContainer: {
    flexGrow: 1,
  },
  contentContainerPadding: {
    flexGrow: 1,
    padding: 16,
  },
  dotActive: {
    ...dotStyle,
    backgroundColor: colors.brand,
  },
  dotInactive: {
    ...dotStyle,
    backgroundColor: colors.backgroundFour,
  },
  dotsWrapper: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 16,
  },
  marginLeft: {
    marginLeft: DOT_SIZE / 2,
  },
  row: {
    flexDirection: 'row',
  },
  safeLayout: {
    backgroundColor: colors.backgroundPrimary,
  },
  secondaryButton: {
    marginTop: grid.xxxl,
    paddingHorizontal: grid.xs,
  },
});
