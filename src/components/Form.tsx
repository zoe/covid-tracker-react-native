import { RegularText } from '@covid/components/Text';
import { Text } from '@covid/components/typography/Text';
import i18n from '@covid/locale/i18n';
import { sizes, styling } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

// The space character is added in this way to prevent the asterisk from being word-wrapped at the end of the line.
export const requiredFormMarker = '\u00a0*';

type TFormProps = {
  children: React.ReactNode;
  hasRequiredFields?: boolean;
  redesign?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const Form = (props: TFormProps) => (
  <View style={[styling.flex, props.style]}>
    {props.hasRequiredFields ? (
      props.redesign ? (
        <Text style={styles.formMarker} textClass="pSmall">
          {requiredFormMarker} {i18n.t('required-field')}
        </Text>
      ) : (
        <RegularText style={styling.marginBottom}>
          {requiredFormMarker} {i18n.t('required-field')}
        </RegularText>
      )
    ) : null}
    {props.children}
  </View>
);

const styles = StyleSheet.create({
  formMarker: {
    color: colors.secondary,
    marginBottom: sizes.l,
  },
});
