import { Text } from '@covid/components';
import { requiredFormMarker } from '@covid/components/Form';
import { SelectableButton } from '@covid/components/SelectableButton';
import { FieldLabelRedesigned } from '@covid/components/Text';
import { ValidationError } from '@covid/components/ValidationError';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
  testID?: string;
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
  testID,
}: IProps) {
  const [selected, setSelected] = React.useState<string>(selectedValue);

  const onSelect = (value: string) => {
    setSelected(value);
    onValueChange(value);
  };

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
            selected={selected === item.value}
            style={{ flex: 1, marginLeft: index !== 0 ? sizes.xs : 0 }}
            testID={`button-${item.value}${testID ? `-${testID}` : ''}`}
          >
            {item.label}
          </SelectableButton>
        ))}
      </View>
      {showPnts ? (
        <TouchableOpacity onPress={() => onSelect('pnts')}>
          <Text
            style={[styles.center, selected === 'pnts' ? styles.selected : styles.notSelected]}
            textClass="pSmallMedium"
          >
            Prefer not to say
          </Text>
        </TouchableOpacity>
      ) : null}

      {error ? <ValidationError error={error} style={styles.error} /> : null}
    </>
  );
}

const styles = StyleSheet.create({
  center: {
    textAlign: 'center',
  },
  decreasedMargin: {
    marginBottom: sizes.m,
  },
  error: {
    marginLeft: 0,
    marginTop: sizes.xs,
  },
  label: {
    marginBottom: sizes.l,
  },
  marginBottom: {
    marginBottom: sizes.l,
  },
  notSelected: {
    color: colors.secondary,
  },
  row: {
    flexDirection: 'row',
  },
  selected: {
    color: colors.darkBlue,
  },
});
