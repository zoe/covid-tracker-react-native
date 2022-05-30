import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import { Item } from 'native-base';
import React, { ReactNode, useEffect, useState } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const HIT_SLOP = {
  bottom: 4,
  left: 20,
  right: 4,
  top: 4,
};

export interface IRadioProps {
  children?: ReactNode;
  label?: string;
  unselectedStyle?: StyleProp<ViewStyle>;
  selectedStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<ViewStyle>;
  onSelect: (selected: boolean) => void;
  value?: string | number;
  selected: boolean;
}

/**
 * Radio
 *
 * @param label (optional) label of radio button
 * @param unselectedStyle (optional) override unselected radio button style
 * @param selectedStyle (optional) override selected radio button style
 * @param onSelect: radio button click handler
 * @param selected: state of radio button
 * @param children components to display as children of the radio button
 */
export default function Radio({
  label,
  onSelect,
  selectedStyle,
  labelStyle,
  children,
  unselectedStyle,
  selected,
}: IRadioProps) {
  const [isSelected, setSelect] = useState<boolean>(false);

  const onSelected = () => {
    setSelect(!isSelected);
    onSelect(!isSelected);
  };

  useEffect(() => {
    setSelect(selected);
  }, [selected]);

  return (
    <TouchableWithoutFeedback hitSlop={HIT_SLOP} onPress={onSelected} style={[baseStyles.view, unselectedStyle]}>
      <View style={[baseStyles.wrapperRedesign]}>
        <View style={[isSelected ? baseStyles.dot : baseStyles.dotTransparent, selectedStyle]} />
      </View>
      <View>
        {/* @ts-ignore */}
        <Item onPress={onSelected} style={baseStyles.labelView}>
          {label ? <Text style={[baseStyles.label, labelStyle]}>{label}</Text> : children}
        </Item>
      </View>
    </TouchableWithoutFeedback>
  );
}

const baseStyles = StyleSheet.create({
  dot: {
    backgroundColor: colors.brand,
    borderRadius: grid.g8,
    height: grid.g4,
    padding: grid.g4,
    width: grid.g4,
  },
  dotTransparent: {
    backgroundColor: colors.transparent,
  },
  label: {
    borderColor: colors.transparent,
    fontSize: 14,
    lineHeight: grid.g24,
    marginLeft: grid.g16,
    textTransform: 'capitalize',
  },
  labelView: {
    borderColor: colors.transparent,
    marginLeft: grid.g16,
  },
  view: {
    flexDirection: 'row',
    height: grid.g24,
  },
  wrapperRedesign: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.secondary,
    borderRadius: grid.g8,
    borderWidth: 1,
    height: grid.g16,
    justifyContent: 'center',
    marginTop: grid.g4,
    padding: grid.g4,
    width: grid.g16,
  },
});
