import { BrandedButton } from '@covid/components';
import { RegularText } from '@covid/components/Text';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, TextStyle } from 'react-native';

interface Props {
  onPress: VoidFunction;
  branded?: boolean;
  outline?: boolean;
  labelStyle?: TextStyle;
}

export const Button: React.FC<Props> = ({ children, onPress, ...props }) => {
  if (props.branded) {
    return (
      <BrandedButton onPress={onPress} style={[styles.base, styles.container]}>
        <RegularText style={[styles.lightLabel, props.labelStyle]}>{children}</RegularText>
      </BrandedButton>
    );
  }

  if (props.outline) {
    return (
      <BrandedButton onPress={onPress} style={[styles.base, styles.outlineContainer]}>
        <RegularText style={[styles.outlineLabel, props.labelStyle]}>{children}</RegularText>
      </BrandedButton>
    );
  }

  return (
    <BrandedButton onPress={onPress} style={[styles.base]}>
      <RegularText style={[styles.darkLabel, props.labelStyle]}>{children}</RegularText>
    </BrandedButton>
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: 'transparent',
    marginHorizontal: 16,
    marginTop: 16,
  },
  container: {
    backgroundColor: colors.brand,
    marginHorizontal: 16,
    marginTop: 16,
  },
  darkLabel: {
    color: colors.brand,
  },

  lightLabel: {
    color: colors.white,
  },

  outlineContainer: {
    borderColor: colors.brand,
    borderWidth: 1,
  },

  outlineLabel: {
    color: colors.brand,
  },
});
