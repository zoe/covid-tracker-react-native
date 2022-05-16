import IconInfo, { TIconInfoProps } from '@assets/v2/svg/icon-info';
import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import Column from '@tracer/components/atoms/Column';
import Row from '@tracer/components/atoms/Row';
import IconButton from '@tracer/components/molecules/IconButton';
import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';

interface IInfoLabelProps {
  text: string;
  iconProps?: TIconInfoProps;
  onPressInfo: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export default function InfoLabel({ text, onPressInfo, iconProps, style, textStyle }: IInfoLabelProps) {
  return (
    <Row style={[baseStyle.row, style]}>
      <Column>
        <Text style={[baseStyle.text, textStyle]}>{text}</Text>
      </Column>
      <Column style={[baseStyle.infoColumn]}>
        <IconButton buttonType="tertiary" onPress={onPressInfo}>
          <IconInfo
            fill={baseStyle.iconStroke.backgroundColor}
            strokeColor={baseStyle.iconStroke.color}
            {...iconProps}
          />
        </IconButton>
      </Column>
    </Row>
  );
}

const baseStyle = StyleSheet.create({
  iconStroke: {
    backgroundColor: colors.transparent,
    color: colors.text.primary,
  },
  infoColumn: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: grid.g8,
    paddingTop: grid.g4,
  },
  row: {
    flexGrow: 1,
  },
  text: {
    fontSize: 14,
    fontWeight: '300',
    letterSpacing: 0,
    lineHeight: 20,
    paddingVertical: grid.g2,
    textAlign: 'left',
  },
});
