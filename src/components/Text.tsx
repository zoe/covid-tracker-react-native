import { colors, fontStyles } from '@theme';
import React from 'react';
import { ImageStyle, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

import { ITest } from './types';

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle | TextStyle | ImageStyle>;
  passProps?: any;
  testID?: string;
  highlightColor?: any;
}

export const Header0Text = ({ style, children }: Props) => <Text style={[styles.header0Text, style]}>{children}</Text>;

export const HeaderText = ({ style, children }: Props) => <Text style={[styles.headerText, style]}>{children}</Text>;

export const HeaderLightText = ({ style, children, testID }: Props) => (
  <Text testID={testID ?? ''} style={[styles.headerLightText, style]}>
    {children}
  </Text>
);

export const Header3Text = ({ style, children }: Props) => <Text style={[styles.header3Text, style]}>{children}</Text>;

interface IColourHighlightHeaderTextTextProps {
  text: string;
  style?: StyleProp<ViewStyle | TextStyle | ImageStyle>;
  highlightColor?: any;
}
// Basic component that allows single colour highlighted text - wrap the marked text with **
export const ColourHighlightHeaderTextText = ({ text, style, highlightColor }: IColourHighlightHeaderTextTextProps) => {
  const textParts: string[] = text.split('*');
  let highlightedText: boolean = !!text.startsWith('*');
  return (
    <Text style={[styles.headerText, style]}>
      {textParts
        .filter((text: string) => text)
        .map((text: string) => {
          const node: React.ReactNode = (
            <Text style={{ color: highlightedText ? highlightColor : styles.headerText.color }}>{text}</Text>
          );
          highlightedText = !highlightedText;
          return node;
        })}
    </Text>
  );
};

export const RegularText = ({ style, children, passProps }: Props) => (
  <Text style={[styles.regularText, style]} {...passProps}>
    {children}
  </Text>
);

export const FieldLabel = ({ style, children }: Props) => (
  <Text style={[styles.regularText, styles.fieldLabel, style]}>{children}</Text>
);

export const ClippedText = ({ style, children }: Props) => (
  <Text numberOfLines={1} style={[styles.regularText, style]}>
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

export interface IClickableProps extends ITest {
  children: React.ReactNode;
  style?: any;
  onPress: () => void;
  enable?: boolean;
  hideLoading?: boolean;
  testID?: string;
}


export const ClickableText = ({ style, children, onPress, testID }: IClickableProps) => (
  <Text onPress={onPress} style={[styles.clickableText, style]} testID={testID ?? ''}>
    {children}
  </Text>
);

export const Divider: React.FC<{ styles?: StyleProp<ViewStyle> }> = ({ styles: passed }) => (
  <View style={[styles.divider, passed]} />
);

const styles = StyleSheet.create({
  captionText: {
    ...fontStyles.bodySmallLight,
  },

  clickableText: {
    ...fontStyles.bodyReg,
    color: colors.purple,
  },

  divider: {
    borderBottomWidth: 2,
    borderColor: colors.backgroundFour,
  },

  errorText: {
    ...fontStyles.bodyReg,
    color: colors.feedbackBad,
  },

  fieldLabel: {
    marginBottom: -16,
  },

  header0Text: {
    ...fontStyles.h0Reg,
  },

  header3Text: {
    ...fontStyles.h3Reg,
  },

  headerLightText: {
    ...fontStyles.h1Light,
  },

  headerText: {
    ...fontStyles.h2Reg,
  },

  regularBoldText: {
    ...fontStyles.bodyReg,
    fontFamily: 'SofiaPro-SemiBold',
  },

  regularMutedText: {
    ...fontStyles.bodyMutedReg,
  },

  regularText: {
    ...fontStyles.bodyReg,
  },

  secondaryText: {
    ...fontStyles.bodySecondary,
  },
});
