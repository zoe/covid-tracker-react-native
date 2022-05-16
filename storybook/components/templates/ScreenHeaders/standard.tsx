import IconArrowLeft from '@assets/v2/svg/icon-arrow-left';
import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import IconButton from '@tracer/components/molecules/IconButton';
import { ScreenNavigatorCompact } from '@tracer/components/organisms/Screen/nav';
import React from 'react';
import { StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';

interface IScreenStandardHeaderProps {
  style?: StyleProp<ViewStyle>;
  text?: string;
  onGoBack: () => void;
}

export default function ScreenStandardHeader({ style, onGoBack, text }: IScreenStandardHeaderProps) {
  return (
    <ScreenNavigatorCompact
      left={
        <IconButton onPress={() => onGoBack()}>
          <IconArrowLeft />
        </IconButton>
      }
      middle={text ? <Text style={[baseStyle.middleText]}>{text}</Text> : null}
      style={[baseStyle.view, style]}
    />
  );
}

const baseStyle = StyleSheet.create({
  middleText: {
    fontSize: grid.g16,
    fontWeight: '300',
    letterSpacing: 0,
    lineHeight: grid.g24,
    textAlign: 'center',
  },
  view: {
    alignItems: 'center',
    backgroundColor: colors.surface.interactive,
    flexDirection: 'row',
  },
});
