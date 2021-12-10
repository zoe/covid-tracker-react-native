import { requiredFormMarker } from '@covid/components/Form';
import { RadioButton } from '@covid/components/RadioButton';
import { CaptionText, ErrorText, LabelText } from '@covid/components/Text';
import { TextWithBoldInserts } from '@covid/components/typography/TextWithBoldInserts';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
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
  description?: string;
}

const defaultItems: IItem[] = [
  { label: i18n.t('picker-no'), value: 'no' },
  { label: i18n.t('picker-yes'), value: 'yes' },
];

export function RadioInput(props: IProps) {
  const items = props.items?.length ? props.items : defaultItems;

  return (
    <View style={[styles.marginVertical, props.style]} testID={props.testID}>
      {props.hideLabel || !props.label ? null : (
        <LabelText style={props.description ? null : styles.marginBottom}>
          {props.label}
          {props.required ? requiredFormMarker : null}
          {props.IconComponent ? (
            <TouchableOpacity onPress={props.iconOnPress} style={styles.icon}>
              <props.IconComponent />
            </TouchableOpacity>
          ) : null}
        </LabelText>
      )}
      {props.description ? (
        <CaptionText style={{ color: colors.secondary, marginBottom: sizes.m }}>{props.description}</CaptionText>
      ) : null}
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
          <TextWithBoldInserts inverted colorPalette="uiDark" colorShade="dark" style={styles.label} textClass="p">
            {item.label}
          </TextWithBoldInserts>
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
    paddingBottom: sizes.s,
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
    marginLeft: sizes.s,
  },
  lastItem: {
    ...itemStyle,
    paddingTop: sizes.s,
  },
  marginBottom: {
    marginBottom: sizes.s,
  },
  marginTop: {
    marginTop: sizes.s,
  },
  marginVertical: {
    marginVertical: sizes.m,
  },
  middleItem: {
    ...itemStyle,
    paddingVertical: sizes.s,
  },
});
