import { Text } from '@covid/components';
import { requiredFormMarker } from '@covid/components/Form';
import { CaptionText, FieldLabelRedesigned } from '@covid/components/Text';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import { ValidationError } from '@covid/components/ValidationError';
import { TEXT_INPUT_PNTS_LABEL } from '@covid/features/health-profile/utils/healthProfileUtils';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import { FormikErrors, FormikProps } from 'formik';
import * as React from 'react';
import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface IProps extends TextInputProps {
  formikProps: FormikProps<any>;
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  showError?: boolean;
  inputProps?: TextInputProps;
  showPnts?: boolean;
  style?: StyleProp<ViewStyle>;
  required?: boolean;
  IconComponent?: React.ComponentType<any>;
  iconOnPress?: () => void;
}

const HIT_SLOP = {
  bottom: 12,
  left: 12,
  right: 12,
  top: 12,
};

export function GenericTextField(props: IProps) {
  const {
    formikProps,
    name,
    label,
    description,
    placeholder,
    keyboardType,
    showError,
    showPnts,
    style,
    inputProps,
    ...otherProps
  } = props;

  return (
    <View style={style}>
      {label ? (
        <FieldLabelRedesigned>
          {label}
          {props.required ? requiredFormMarker : null}
          {props.IconComponent ? (
            <TouchableOpacity hitSlop={HIT_SLOP} onPress={props.iconOnPress} style={styles.icon}>
              <props.IconComponent />
            </TouchableOpacity>
          ) : null}
        </FieldLabelRedesigned>
      ) : null}
      {description ? (
        <CaptionText style={{ color: colors.secondary, marginBottom: sizes.m }}>{description}</CaptionText>
      ) : null}
      <ValidatedTextInput
        error={formikProps.touched[name] && !!formikProps.errors[name]}
        keyboardType={keyboardType}
        onBlur={formikProps.handleBlur(name)}
        onChangeText={formikProps.handleChange(name)}
        placeholder={props.placeholder}
        required={props.required}
        returnKeyType="next"
        value={formikProps.values[name]}
        viewStyle={showPnts ? styles.marginBottom : null}
        {...inputProps}
        {...otherProps}
      />
      {showPnts ? (
        <TouchableOpacity onPress={() => formikProps.setFieldValue(name, TEXT_INPUT_PNTS_LABEL)}>
          <Text
            style={[
              styles.center,
              formikProps.values[name] === TEXT_INPUT_PNTS_LABEL ? styles.selected : styles.notSelected,
            ]}
            textClass="pSmallMedium"
          >
            {TEXT_INPUT_PNTS_LABEL}
          </Text>
        </TouchableOpacity>
      ) : null}

      {showError && !!formikProps.touched[name] && !!formikProps.errors[name] ? (
        <ValidationError error={formikProps.errors[name] as FormikErrors<string>} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    textAlign: 'center',
  },
  icon: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 2,
    paddingLeft: sizes.xxs,
  },
  marginBottom: {
    marginBottom: sizes.l,
  },
  notSelected: {
    color: colors.secondary,
  },
  selected: {
    color: colors.darkBlue,
  },
});
