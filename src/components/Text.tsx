import { colors, fontStyles } from '@theme';
import * as React from 'react';
import { ImageStyle, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

import { ITest } from './types';

interface IClickableTextProps extends ITest {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  enabled?: boolean;
  hideLoading?: boolean;
}

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle | TextStyle | ImageStyle>;
  passProps?: any;
  testID?: string;
  highlightColor?: any;
}

export const Header0Text = ({ style, children }: Props) => <Text style={[fontStyles.h0Reg, style]}>{children}</Text>;

export const HeaderText = ({ style, children }: Props) => <Text style={[fontStyles.h2Reg, style]}>{children}</Text>;

export const HeaderLightText = ({ style, children }: Props) => (
  <Text style={[fontStyles.h1Light, style]}>{children}</Text>
);

export const Header3Text = ({ style, children }: Props) => <Text style={[fontStyles.h3Reg, style]}>{children}</Text>;

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
    <Text style={[fontStyles.h2Reg, style]}>
      {textParts
        .filter((text: string) => text)
        .map((text: string) => {
          const node: React.ReactNode = (
            <Text style={{ color: highlightedText ? highlightColor : fontStyles.h2Reg.color }}>{text}</Text>
          );
          highlightedText = !highlightedText;
          return node;
        })}
    </Text>
  );
};

export const RegularText = ({ style, children, passProps }: Props) => (
  <Text style={[fontStyles.bodyReg, style]} {...passProps}>
    {children}
  </Text>
);

export const FieldLabel = ({ style, children }: Props) => (
  <Text style={[fontStyles.bodyReg, styles.fieldLabel, style]}>{children}</Text>
);

export const ClippedText = ({ style, children }: Props) => (
  <Text numberOfLines={1} style={[fontStyles.bodyReg, style]}>
    {children}
  </Text>
);

export const SecondaryText = ({ style, children }: Props) => (
  <Text style={[fontStyles.bodySecondary, style]}>{children}</Text>
);

export const MutedText = ({ style, children }: Props) => (
  <Text style={[fontStyles.bodyMutedReg, style]}>{children}</Text>
);

export const CaptionText = ({ style, children }: Props) => (
  <Text style={[fontStyles.bodySmallLight, style]}>{children}</Text>
);

export const ErrorText = ({ style, children }: Props) => <Text style={[styles.errorText, style]}>{children}</Text>;

export const RegularBoldText = ({ style, children }: Props) => (
  <Text style={[styles.regularBoldText, style]}>{children}</Text>
);

export const ClickableText = ({ style, children, onPress, testID }: IClickableTextProps) => (
  <Text onPress={onPress} style={[styles.clickableText, style]} testID={testID}>
    {children}
  </Text>
);

export const Divider: React.FC<{ styles?: StyleProp<ViewStyle> }> = ({ styles: passed }) => (
  <View style={[styles.divider, passed]} />
);

export const LabelText = ({ style, children }: Props) => <Text style={[fontStyles.label, style]}>{children}</Text>;

const styles = StyleSheet.create({
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
  regularBoldText: {
    ...fontStyles.bodyReg,
    fontFamily: 'SofiaPro-SemiBold',
  },
});
