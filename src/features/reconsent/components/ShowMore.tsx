import { Text } from '@covid/components';
import i18n from '@covid/locale/i18n';
import { colors } from '@theme';
import * as React from 'react';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';

interface IProps {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function ShowMore(props: IProps) {
  return (
    <Pressable onPress={props.onPress} style={props.style}>
      <Text style={styles.text} textClass="pMedium">
        {i18n.t('reconsent.disease-preferences.show-more')}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colors.purple,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
