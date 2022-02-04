import DropdownField from '@covid/components/DropdownField';
import { requiredFormMarker } from '@covid/components/Form';
import { FieldLabelRedesigned } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

type TProps = {
  label?: string;
  onValueChange: (value: string) => void;
  required?: boolean;
  testID?: string;
  value: string;
};

const HOUR_ITEMS = Array(19)
  .fill(null)
  .map((_, i) => ({
    label: `${i}`,
    value: `${i}`,
  }));

const MINUTE_ITEMS = Array(4)
  .fill(null)
  .map((_, i) => ({
    label: `${15 * i}`,
    value: `${15 * i}`,
  }));

export const TimeField = (props: TProps) => {
  const [hours, minutes] = React.useMemo(() => {
    const value = Number.parseInt(props.value, 10);
    if (Number.isNaN(value)) {
      return ['', ''];
    }
    const h = Math.floor(value / 60);
    const m = Math.round((value % 60) / 15) * 15;
    return [h + '', m + ''];
  }, [props.value]);

  const onValueChangeHours = React.useCallback(
    (newHours: string) => {
      const newValue = Number.parseInt(newHours, 10) * 60 + (Number.parseInt(minutes, 10) || 0);
      props.onValueChange(newValue + '');
    },
    [props.onValueChange, minutes],
  );

  const onValueChangeMinutes = React.useCallback(
    (newMinutes: string) => {
      const newValue = (Number.parseInt(hours, 10) || 0) * 60 + Number.parseInt(newMinutes, 10);
      props.onValueChange(newValue + '');
    },
    [props.onValueChange, hours],
  );

  return (
    <View testID={props.testID}>
      <FieldLabelRedesigned style={styles.noMargin}>
        {props.label}
        {props.required ? requiredFormMarker : null}
      </FieldLabelRedesigned>
      <View style={styles.row}>
        <DropdownField
          hideLabel
          items={HOUR_ITEMS}
          label={props.label}
          onValueChange={onValueChangeHours}
          placeholder={i18n.t('hours')}
          required={props.required}
          selectedValue={hours}
          style={styles.noMargin}
        />
        <View style={styles.marginHorizontal} />
        <DropdownField
          hideLabel
          items={MINUTE_ITEMS}
          label={props.label}
          onValueChange={onValueChangeMinutes}
          placeholder={i18n.t('minutes')}
          required={props.required}
          selectedValue={minutes}
          style={styles.noMargin}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  marginHorizontal: {
    marginHorizontal: sizes.xs,
  },
  noMargin: {
    marginBottom: 0,
  },
  row: {
    flexDirection: 'row',
  },
});
