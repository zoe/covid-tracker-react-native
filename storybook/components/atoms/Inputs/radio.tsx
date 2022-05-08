import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import React, { ReactNode, useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface IRadioProps {
  children: ReactNode;
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
export default function Radio({ onSelect, selectedStyle, children, unselectedStyle, selected }: IRadioProps) {
  const [isSelected, setSelect] = useState<boolean>(selected);

  const onSelected = () => {
    setSelect(!isSelected);
    onSelect(!isSelected);
  };

  return (
    <View onTouchEnd={onSelected} style={[baseStyles.view, unselectedStyle]}>
      <View style={[baseStyles.wrapperRedesign]}>
        <View style={[isSelected ? baseStyles.dot : baseStyles.dotTransparent, selectedStyle]} />
      </View>
      <View style={baseStyles.labelView}>
        {/* @ts-ignore */}
        {children}
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
  labelView: {
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
