import { colors, fontStyles } from '@theme';
import * as React from 'react';
import { ImageStyle, StyleProp, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';

import { ITest } from './types';

interface IClickableTextProps extends ITest {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
  enabled?: boolean;
  hideLoading?: boolean;
}

interface IProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  passProps?: any;
  testID?: string;
  highlightColor?: any;
}

export const Header0Text = ({ style, children }: IProps) => <Text style={[fontStyles.h0Reg, style]}>{children}</Text>;

export const HeaderText = ({ style, children }: IProps) => <Text style={[fontStyles.h2Reg, style]}>{children}</Text>;

export const HeaderLightText = ({ style, children }: IProps) => (
  <Text style={[fontStyles.h1Light, style]}>{children}</Text>
);

export const Header3Text = ({ style, children }: IProps) => <Text style={[fontStyles.h3Reg, style]}>{children}</Text>;

interface IColourHighlightHeaderTextTextProps {
  text: string;
  style?: StyleProp<ViewStyle | TextStyle | ImageStyle>;
  highlightColor?: any;
}
// Basic component that allows single colour highlighted text - wrap the marked text with **
export const ColourHighlightHeaderTextText = (props: IColourHighlightHeaderTextTextProps) => {
  const textParts: string[] = props.text.split('*');
  let highlightedText: boolean = !!props.text.startsWith('*');
  return (
    <Text style={[fontStyles.h2Reg, props.style]}>
      {textParts
        .filter((text: string) => text)
        .map((text: string) => {
          const node: React.ReactNode = (
            <Text style={{ color: highlightedText ? props.highlightColor : fontStyles.h2Reg.color }}>{text}</Text>
          );
          highlightedText = !highlightedText;
          return node;
        })}
    </Text>
  );
};

export const LightText = ({ style, children, passProps }: IProps) => (
  <Text style={[fontStyles.bodyLight, style]} {...passProps}>
    {children}
  </Text>
);

export const RegularText = ({ style, children, testID }: IProps) => (
  <Text style={[fontStyles.bodyReg, style]} testID={testID}>
    {children}
  </Text>
);

interface IRegularTextWithBoldInsertsProps {
  text: string;
  style?: StyleProp<ViewStyle | TextStyle | ImageStyle>;
}

export const RegularTextWithBoldInserts = (props: IRegularTextWithBoldInsertsProps) => {
  const textParts: string[] = props.text.split('*');
  let boldText: boolean = !!props.text.startsWith('*');
  return (
    <Text style={props.style}>
      {textParts
        .filter((text: string) => text)
        .map((text: string, index: number) => {
          const key = `bold-text-${index}`;
          const node: React.ReactNode = boldText ? (
            <Text key={key} style={{ fontWeight: '600' }}>
              {text}
            </Text>
          ) : (
            <Text key={key}>{text}</Text>
          );
          boldText = !boldText;
          return node;
        })}
    </Text>
  );
};

export const FieldLabel = ({ style, children }: IProps) => (
  <Text style={[fontStyles.bodyReg, styles.fieldLabel, style]}>{children}</Text>
);

export const ClippedText = ({ style, children }: IProps) => (
  <Text numberOfLines={1} style={[fontStyles.bodyReg, style]}>
    {children}
  </Text>
);

export const SecondaryText = ({ style, children }: IProps) => (
  <Text style={[fontStyles.bodySecondary, style]}>{children}</Text>
);

export const MutedText = ({ style, children }: IProps) => (
  <Text style={[fontStyles.bodyMutedReg, style]}>{children}</Text>
);

export const CaptionText = ({ style, children }: IProps) => (
  <Text style={[fontStyles.bodySmallLight, style]}>{children}</Text>
);

export const ErrorText = ({ style, children }: IProps) => <Text style={[styles.errorText, style]}>{children}</Text>;

export const DeleteText = ({ style, children }: IProps) => <Text style={[styles.deleteText, style]}>{children}</Text>;

export const RegularBoldText = ({ style, children }: IProps) => (
  <Text style={[styles.regularBoldText, style]}>{children}</Text>
);

// @todo: Remove the onPress property because the animation is ugly.
export const ClickableText = ({ style, children, onPress, testID }: IClickableTextProps) => (
  <Text onPress={onPress} style={[styles.clickableText, style]} testID={testID}>
    {children}
  </Text>
);

export const LabelText = ({ style, children }: IProps) => <Text style={[fontStyles.label, style]}>{children}</Text>;
export const LabelSecondaryText = ({ style, children }: IProps) => (
  <Text style={[fontStyles.labelSecondary, style]}>{children}</Text>
);

const styles = StyleSheet.create({
  clickableText: {
    ...fontStyles.bodyReg,
    color: colors.purple,
  },
  deleteText: {
    ...fontStyles.bodyReg,
    color: colors.red,
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
