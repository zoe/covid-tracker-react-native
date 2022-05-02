import { Text } from '@covid/components';
import { requiredFormMarker } from '@covid/components/Form';
import { PNTS_VALUE_TO_SAVE_IN_DB, TEXT_INPUT_PNTS_LABEL } from '@covid/components/inputsRedesigned/constants';
import { SelectableButton } from '@covid/components/SelectableButton';
import { FieldLabelRedesigned } from '@covid/components/Text';
import { ValidationError } from '@covid/components/ValidationError';
import { sizes } from '@covid/themes';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { covidStyles, healthStudyStyles } from './ButtonsGroupStyle';

export interface ISingleButton {
  label?: string;
  value: string;
}

interface IProps {
  description?: string | null;
  error?: any;
  hideLabel?: boolean;
  items: ISingleButton[];
  label?: string;
  onValueChange: any;
  required?: boolean;
  selectedValue: string;
  showPnts?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  unselectedBgColor?: string;
  unselectedTextColor?: string;
  reBrand?: boolean;
}

export function ButtonsGroup({
  description,
  error,
  hideLabel,
  items,
  label,
  onValueChange,
  required,
  selectedValue,
  showPnts,
  style,
  testID,
  unselectedBgColor,
  unselectedTextColor,
  reBrand = false,
}: IProps) {
  const [selected, setSelected] = React.useState<string>(selectedValue);

  const onSelect = (value: string) => {
    setSelected(value);
    onValueChange(value);
  };

  const styles = reBrand ? healthStudyStyles : covidStyles;
  return (
    <>
      {hideLabel ? null : (
        <FieldLabelRedesigned style={[styles.label, description ? styles.decreasedMargin : null]}>
          {label}
          {required ? requiredFormMarker : null}
        </FieldLabelRedesigned>
      )}

      {description ? (
        <Text inverted colorPalette="accentBlue" colorShade="main" style={styles.marginBottom} textClass="pSmallMedium">
          {description}
        </Text>
      ) : null}

      <View style={[styles.row, showPnts ? styles.marginBottom : null]}>
        {items.map((item, index) => (
          // TODO: Remember to remove redesign prop once we combine ButtonGroup components
          <SelectableButton
            redesign
            key={item.value}
            onPress={() => onSelect(item.value)}
            reBrand={reBrand}
            selected={selected === item.value}
            style={[{ flex: 1, marginLeft: index !== 0 ? sizes.xs : 0 }, style]}
            testID={`button-${item.value}${testID ? `-${testID}` : ''}`}
            unselectedBgColor={unselectedBgColor}
            unselectedTextColor={unselectedTextColor}
          >
            {item.label}
          </SelectableButton>
        ))}
      </View>
      {showPnts ? (
        <TouchableOpacity onPress={() => onSelect(PNTS_VALUE_TO_SAVE_IN_DB)}>
          <Text
            style={[styles.center, selected === PNTS_VALUE_TO_SAVE_IN_DB ? styles.selected : styles.notSelected]}
            textClass="pSmallMedium"
          >
            {TEXT_INPUT_PNTS_LABEL}
          </Text>
        </TouchableOpacity>
      ) : null}

      {error ? <ValidationError error={error} style={styles.error} /> : null}
    </>
  );
}
