import { Text } from '@covid/components';
import { requiredFormMarker } from '@covid/components/Form';
import { RadioButton } from '@covid/components/RadioButton';
import { FieldLabelRedesigned } from '@covid/components/Text';
import { TextWithBoldInserts } from '@covid/components/typography/TextWithBoldInserts';
import { ValidationError } from '@covid/components/ValidationError';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  PickerItemProps,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface IItem extends Omit<PickerItemProps, 'label'> {
  iconSource?: ImageSourcePropType;
  label: string;
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
  IconComponent?: React.ComponentType<any>;
  iconOnPress?: () => void;
  style?: StyleProp<ViewStyle>;
  description?: string | null;
}

const defaultItems: IItem[] = [
  { label: i18n.t('picker-no'), value: 'no' },
  { label: i18n.t('picker-yes'), value: 'yes' },
];

export function RadioInput(props: IProps) {
  const items = props.items?.length ? props.items : defaultItems;

  return (
    <View style={[props.style]} testID={props.testID}>
      {props.hideLabel || !props.label ? null : (
        <FieldLabelRedesigned>
          {props.label}
          {props.required ? requiredFormMarker : null}
          {props.IconComponent ? (
            <TouchableOpacity onPress={props.iconOnPress} style={styles.icon}>
              <props.IconComponent />
            </TouchableOpacity>
          ) : null}
        </FieldLabelRedesigned>
      )}

      {props.description ? (
        <Text inverted colorPalette="accentBlue" colorShade="main" style={styles.marginBottom} textClass="pSmallMedium">
          {props.description}
        </Text>
      ) : null}

      {items.map((item, index) => (
        <TouchableOpacity
          accessible
          accessibilityRole="radio"
          key={`item-${item.label}-${item.value}`}
          onPress={() => props.onValueChange(item.value)}
          style={
            index === 0 ? styles.firstItem : index + 1 === props.items?.length ? styles.lastItem : styles.middleItem
          }
          testID={`${props.testID || 'input-radio'}-item-${item.value}`}
        >
          {/* TODO: Remember to remove redesign prop once we combine RadioButton components */}
          <RadioButton redesign selected={props.selectedValue === item.value} />
          {item.iconSource ? <Image source={item.iconSource} style={styles.image} /> : null}
          <TextWithBoldInserts
            inverted
            colorPalette="uiDark"
            colorShade="darker"
            style={styles.label}
            textClass="pLight"
          >
            {item.label}
          </TextWithBoldInserts>
        </TouchableOpacity>
      ))}
      {props.error ? <ValidationError error={props.error} style={styles.error} /> : null}
    </View>
  );
}

const itemStyle: ViewStyle = {
  alignItems: 'center',
  flexDirection: 'row',
};

const styles = StyleSheet.create({
  error: {
    marginLeft: 0,
    marginTop: sizes.xs,
  },
  firstItem: {
    ...itemStyle,
    paddingBottom: sizes.xs,
  },
  icon: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 2,
    paddingLeft: sizes.xxs,
  },
  image: {
    height: 24,
    marginLeft: sizes.s,
    width: 24,
  },
  label: {
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: sizes.m,
  },
  lastItem: {
    ...itemStyle,
    paddingTop: sizes.xs,
  },
  marginBottom: {
    marginBottom: sizes.m,
  },
  marginVertical: {
    marginVertical: sizes.m,
  },
  middleItem: {
    ...itemStyle,
    paddingVertical: sizes.xs,
  },
});
