import { SafeLayout, Text } from '@covid/components';
import { BrandedButton } from '@covid/components/buttons';
import { TDiseasePreferencesData } from '@covid/core/state/reconsent/types';
import ChevronLeft from '@covid/features/reconsent/components/ChevronLeft';
import { styling, useTheme } from '@covid/themes';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import * as React from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface IProps {
  activeDot?: number;
  buttonTitle: string;
  buttonOnPress: onNextClickedType;
  children?: React.ReactNode;
  secondaryButtonTitle?: string;
  secondaryButtonOnPress?: () => void;
}

type onNextClickedType = OnFormSubmitCallback | OnNextClickedCallback;
type OnFormSubmitCallback = (arg1?: TDiseasePreferencesData) => void;
type OnNextClickedCallback = () => void;

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
  const theme = useTheme();

  return (
    <SafeLayout style={styles.safeLayout}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity hitSlop={hitSlop} onPress={navigation.goBack}>
          <ChevronLeft />
        </TouchableOpacity>
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
      <ScrollView contentContainerStyle={styling.flexGrow} style={{ paddingHorizontal: theme.grid.gutter }}>
        {props.children}
        <BrandedButton enable onPress={props.buttonOnPress} style={styles.button}>
          {props.buttonTitle}
        </BrandedButton>
        <Text onPress={props.secondaryButtonOnPress} style={styles.secondaryButton} textClass="pLight">
          {props.secondaryButtonTitle}
        </Text>
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
    color: colors.secondary,
    marginTop: 32,
    paddingHorizontal: 4,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
