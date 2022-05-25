import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import Row from '@tracer/components/atoms/Row';
import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

interface SliderTitleProps {
  title: string;
  viewStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export default function SliderTitle({ title, textStyle, viewStyle }: SliderTitleProps) {
  return (
    <View style={[baseStyles.view, viewStyle]}>
      <Row>
        <Text style={[baseStyles.textStyle, textStyle]}>{title}</Text>
      </Row>
    </View>
  );
}

const baseStyles = StyleSheet.create({
  textStyle: {
    color: colors.text.primary,
    fontSize: grid.g16,
    fontWeight: '700',
    lineHeight: grid.g24,
    textAlign: 'left',
  },
  view: {
    paddingHorizontal: grid.g16,
    width: '100%',
  },
});
