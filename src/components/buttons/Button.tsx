import React from 'react';
import { StyleSheet, TextStyle } from 'react-native';

import { colors } from '@theme';
import { RegularText } from '@covid/components/Text';
import { BrandedButton } from '@covid/components';

interface Props {
  onPress: VoidFunction;
  branded?: boolean;
  outline?: boolean;
  labelStyle?: TextStyle;
}

export const Button: React.FC<Props> = ({ children, onPress, ...props }) => {
  if (props.branded) {
    return (
      <BrandedButton style={[styles.base, styles.container]} onPress={onPress}>
        <RegularText style={[styles.lightLabel, props.labelStyle]}>{children}</RegularText>
      </BrandedButton>
    );
  }

  if (props.outline) {
    return (
      <BrandedButton style={[styles.base, styles.outlineContainer]} onPress={onPress}>
        <RegularText style={[styles.outlineLabel, props.labelStyle]}>{children}</RegularText>
      </BrandedButton>
    );
  }

  return (
    <BrandedButton style={[styles.base]} onPress={onPress}>
      <RegularText style={[styles.darkLabel, props.labelStyle]}>{children}</RegularText>
    </BrandedButton>
  );
};

const styles = StyleSheet.create({
  base: {
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: 'transparent',
  },
  container: {
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: colors.brand,
  },
  darkLabel: {
    color: colors.brand,
  },

  lightLabel: {
    color: colors.white,
  },

  outlineLabel: {
    color: colors.brand,
  },

  outlineContainer: {
    borderColor: colors.brand,
    borderWidth: 1,
  },
});
