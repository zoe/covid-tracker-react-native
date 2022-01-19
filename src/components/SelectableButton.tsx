import { RegularText } from '@covid/components/Text';
import { sizes } from '@covid/themes';
import { colors, fontStyles } from '@theme';
import { Button } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';

interface IProps {
  children: React.ReactNode;
  onPress: () => void;
  redesign?: boolean; // TODO: remove in future once redesign is complete
  selected: boolean;
  style?: any;
  testID?: string;
}

export function SelectableButton({ style, children, onPress, redesign, selected, testID }: IProps) {
  const backgroundColor = selected ? (redesign ? colors.darkBlue : colors.brand) : colors.backgroundTertiary;
  const textColor = selected ? colors.white : colors.primary;
  const btnStyle = [styles.button, style, { backgroundColor }];

  return (
    <Button onPress={onPress} style={btnStyle} testID={testID}>
      <RegularText style={[fontStyles.bodyLight, styles.label, { color: textColor }]}>{children}</RegularText>
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: sizes.xs,
    elevation: 0,
    height: 48,
    justifyContent: 'center',
  },
  label: {
    lineHeight: 20,
    paddingHorizontal: sizes.m,
    textAlign: 'center',
  },
});
