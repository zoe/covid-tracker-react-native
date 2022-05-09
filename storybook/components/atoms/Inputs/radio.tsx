import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import { Item } from 'native-base';
import React, { ReactNode, useEffect, useState } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

export interface IRadioProps {
  children?: ReactNode;
  label?: string;
  unselectedStyle?: StyleProp<ViewStyle>;
  selectedStyle?: StyleProp<ViewStyle>;
  onSelect: (selected: boolean) => void;
  selected: boolean;
}

/**
 * Radio
 *
 * @param children components to display inside the column
 */
export default function Radio({ label, onSelect, selectedStyle, children, unselectedStyle, selected }: IRadioProps) {
  const [isSelected, setSelect] = useState<boolean>(false);

  const onSelected = () => {
    setSelect(!isSelected);
    onSelect(!isSelected);
  };

  useEffect(() => {
    setSelect(selected);
  }, [selected]);

  return (
    <View onTouchEnd={onSelected} style={[baseStyles.view, unselectedStyle]}>
      <View style={[baseStyles.wrapperRedesign]}>
        <View style={[isSelected ? baseStyles.dot : baseStyles.dotTransparent, selectedStyle]} />
      </View>
      <View>
        {/* @ts-ignore */}
        <Item onPress={onSelected} style={baseStyles.labelView}>
          {label ? <Text style={baseStyles.label}>{label}</Text> : children}
        </Item>
      </View>
    </View>
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
