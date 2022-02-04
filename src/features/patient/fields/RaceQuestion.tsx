import { Text } from '@covid/components';
import { requiredFormMarker } from '@covid/components/Form';
import { GenericTextField } from '@covid/components/inputsRedesigned/GenericTextField';
import { RadioButton } from '@covid/components/RadioButton';
import { FieldLabelRedesigned } from '@covid/components/Text';
import { TextWithBoldInserts } from '@covid/components/typography/TextWithBoldInserts';
import { ValidationError } from '@covid/components/ValidationError';
import { TItemRadio } from '@covid/features/health-profile/components/HealthProfileQuestionCard';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { FormikProps } from 'formik';
import React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

interface IProps<V = any> {
  description: string | null;
  error?: string;
  formikProps: FormikProps<any>;
  items: TItemRadio[];
  label?: string;
  onValueChange: (value: V) => void;
  required?: boolean;
  selectedValue?: V;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

export function RaceQuestion(props: IProps) {
  return (
    <View style={[props.style]} testID={props.testID}>
      <FieldLabelRedesigned>
        {props.label}
        {props.required ? requiredFormMarker : null}
      </FieldLabelRedesigned>

      {props.description ? (
        <Text inverted colorPalette="accentBlue" colorShade="main" style={styles.marginBottom} textClass="pSmallMedium">
          {props.description}
        </Text>
      ) : null}

      {props.items.map((item, index) => (
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

      {props.formikProps.values.race === 'other' ? (
        <GenericTextField
          required
          formikProps={props.formikProps}
          label={i18n.t('race-other-question')}
          name="race_other"
          style={styles.marginTop}
        />
      ) : null}
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
  marginTop: {
    marginTop: sizes.m,
  },
  middleItem: {
    ...itemStyle,
    paddingVertical: sizes.xs,
  },
});
