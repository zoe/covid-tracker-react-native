import React from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle, TextStyle, ImageStyle } from 'react-native';

import { colors, fontStyles } from '@theme';

import { ITest } from './types';

export * from './BrandedButton';

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle | TextStyle | ImageStyle>;
  testID?: string;
}

export const HeaderText = ({ style, children, testID }: Props) => (
  <Text testID={testID} style={[styles.headerText, style]}>
    {children}
  </Text>
);

export const HeaderLightText = ({ style, children, testID }: Props) => (
  <Text testID={testID} style={[styles.headerLightText, style]}>
    {children}
  </Text>
);

export const Header3Text = ({ style, children }: Props) => <Text style={[styles.header3Text, style]}>{children}</Text>;

export const RegularText = ({ style, children }: Props) => <Text style={[styles.regularText, style]}>{children}</Text>;

export const FieldLabel = ({ style, children }: Props) => (
  <Text style={[styles.regularText, styles.fieldLabel, style]}>{children}</Text>
);

export const ClippedText = ({ style, children }: Props) => (
  <Text style={[styles.regularText, style]} numberOfLines={1}>
    {children}
  </Text>
);

export const SecondaryText = ({ style, children, testID }: Props) => (
  <Text testID={testID} style={[styles.secondaryText, style]}>
    {children}
  </Text>
);

export const MutedText = ({ style, children, testID }: Props) => (
  <Text testID={testID} style={[styles.regularMutedText, style]}>
    {children}
  </Text>
);

export const CaptionText = ({ style, children, testID }: Props) => (
  <Text testID={testID} style={[styles.captionText, style]}>
    {children}
  </Text>
);

export const ErrorText = ({ style, children, testID }: Props) => (
  <Text testID={testID} style={[styles.errorText, style]}>
    {children}
  </Text>
);

export const RegularBoldText = ({ style, children, testID }: Props) => (
  <Text testID={testID} style={[styles.regularBoldText, style]}>
    {children}
  </Text>
);

export interface ClickableProps extends ITest {
  testID: string;
  children: React.ReactNode;
  style?: any;
  onPress: () => void;
  enable?: boolean;
  hideLoading?: boolean;
}

export const ClickableText = ({ testID, style, children, onPress }: ClickableProps) => (
  <Text testID={testID} style={[styles.clickableText, style]} onPress={onPress}>
    {children}
  </Text>
);

export const Divider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  headerText: {
    ...fontStyles.h2Reg,
  },

  header3Text: {
    ...fontStyles.h3Reg,
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

  fieldLabel: {
    paddingHorizontal: 16,
    marginBottom: -16,
  },

  divider: {
    borderBottomWidth: 2,
    borderColor: colors.backgroundFour,
    paddingVertical: 20,
    marginLeft: 15,
  },
});
