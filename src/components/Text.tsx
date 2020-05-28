import { colors, fontStyles } from '@theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ITest } from './types';

export * from './BrandedButton';

interface Props {
  children: React.ReactNode;
  style?: object;
}

export const HeaderText = ({ style, children }: Props) => <Text style={[styles.headerText, style]}>{children}</Text>;

export const HeaderLightText = ({ style, children }: Props) => (
  <Text style={[styles.headerLightText, style]}>{children}</Text>
);

export const RegularText = ({ style, children }: Props) => <Text style={[styles.regularText, style]}>{children}</Text>;

export const ClippedText = ({ style, children }: Props) => (
  <Text style={[styles.regularText, style]} numberOfLines={1}>
    {children}
  </Text>
);

export const SecondaryText = ({ style, children }: Props) => (
  <Text style={[styles.secondaryText, style]}>{children}</Text>
);

export const MutedText = ({ style, children }: Props) => (
  <Text style={[styles.regularMutedText, style]}>{children}</Text>
);

export const CaptionText = ({ style, children }: Props) => <Text style={[styles.captionText, style]}>{children}</Text>;

export const ErrorText = ({ style, children }: Props) => <Text style={[styles.errorText, style]}>{children}</Text>;

export const RegularBoldText = ({ style, children }: Props) => (
  <Text style={[styles.regularBoldText, style]}>{children}</Text>
);

export interface ClickableProps extends ITest {
  children: React.ReactNode;
  style?: any;
  onPress: () => void;
  enable?: boolean;
  hideLoading?: boolean;
}

export const ClickableText = ({ style, children, onPress }: ClickableProps) => (
  <Text style={[styles.clickableText, style]} onPress={onPress}>
    {children}
  </Text>
);

export const Divider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  headerText: {
    ...fontStyles.h2Reg,
  },

  headerLightText: {
    ...fontStyles.h1Light,
  },

  regularText: {
    ...fontStyles.bodyReg,
  },

  secondaryText: {
    ...fontStyles.bodySecondary,
  },

  regularMutedText: {
    ...fontStyles.bodyMutedReg,
  },

  captionText: {
    ...fontStyles.bodySmallLight,
  },

  errorText: {
    ...fontStyles.bodyReg,
    color: colors.feedbackBad,
  },

  regularBoldText: {
    ...fontStyles.bodyReg,
    fontWeight: '600',
  },

  clickableText: {
    ...fontStyles.bodyReg,
    color: colors.purple,
  },

  divider: {
    borderBottomWidth: 2,
    borderColor: colors.backgroundFour,
    paddingVertical: 20,
    marginLeft: 15,
  },
});
