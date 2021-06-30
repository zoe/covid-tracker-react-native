import { requiredFormMarker } from '@covid/components/Forms';
import { RadioButton } from '@covid/components/RadioButton';
import { ErrorText, LabelText, SecondaryText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  PickerItemProps,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface IItem extends PickerItemProps {
  iconSource?: ImageSourcePropType;
}

interface IProps<V = any> {
  error?: string;
  hideLabel?: boolean;
  items: IItem[];
  label?: string;
  onValueChange: (value: V) => void;
  required?: boolean;
  selectedValue?: V;
  testID?: string;
}

const defaultItems: IItem[] = [
  { label: i18n.t('picker-no'), value: 'no' },
  { label: i18n.t('picker-yes'), value: 'yes' },
];

export function RadioInput(props: IProps) {
  const items = props.items?.length ? props.items : defaultItems;

  return (
    <View style={styles.marginVertical} testID={props.testID}>
      {props.hideLabel || !props.label ? null : (
        <LabelText style={styles.marginBottom}>
          {props.label}
          {props.required ? requiredFormMarker : null}
        </LabelText>
      )}
      {items.map((item, index) => (
        <TouchableOpacity
          accessible
          accessibilityRole="radio"
          key={`item-${item.value}`}
          onPress={() => props.onValueChange(item.value)}
          style={
            index === 0 ? styles.firstItem : index + 1 === props.items?.length ? styles.lastItem : styles.middleItem
          }
          testID={`${props.testID || 'input-radio'}-item-${item.value}`}
        >
          <RadioButton selected={props.selectedValue === item.value} />
          {item.iconSource ? <Image source={item.iconSource} style={styles.image} /> : null}
          <SecondaryText style={styles.marginLeft}>{item.label}</SecondaryText>
        </TouchableOpacity>
      ))}
      {props.error ? <ErrorText style={styles.marginTop}>{props.error}</ErrorText> : null}
    </View>
  );
}

const itemStyle: ViewStyle = {
  alignItems: 'center',
  flexDirection: 'row',
};

const styles = StyleSheet.create({
  firstItem: {
    ...itemStyle,
    paddingBottom: 6,
  },
  image: {
    height: 24,
    marginLeft: 12,
    width: 24,
  },
  lastItem: {
    ...itemStyle,
    paddingTop: 6,
  },
  marginBottom: {
    marginBottom: 12,
  },
  marginLeft: {
    marginLeft: 12,
  },
  marginTop: {
    marginTop: 12,
  },
  marginVertical: {
    marginVertical: 16,
  },
  middleItem: {
    ...itemStyle,
    paddingVertical: 12,
  },
});
