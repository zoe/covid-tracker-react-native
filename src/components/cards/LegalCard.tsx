import { Text } from '@covid/components';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

export enum ELegalCardType {
  ImproveHealth = 'improve-health',
  FightCovid19 = 'fight-covid19',
  AdvanceScience = 'advance-science',
  BuildProducts = 'build-products',
}

type TProps = {
  index: number;
  type: ELegalCardType;
};

export function LegalCard(props: TProps) {
  return (
    <View style={props.index === 0 ? styles.firstCard : styles.card}>
      <Text rhythm={8} style={styles.darkBlue} textClass="h4Medium">
        {props.index + 1}
        {'. '}
        {i18n.t(`consent-normal-uk.card-${props.type}-title`)}
      </Text>
      <Text style={styles.darkBlue} textClass="pLight">
        {i18n.t(`consent-normal-uk.card-${props.type}-description`)}
      </Text>
    </View>
  );
}

const cardStyle: ViewStyle = {
  backgroundColor: colors.darkBlue16,
  borderRadius: sizes.m,
  paddingHorizontal: sizes.l,
  paddingVertical: sizes.l,
};

const styles = StyleSheet.create({
  card: {
    ...cardStyle,
    marginTop: sizes.m,
  },
  darkBlue: {
    color: colors.darkBlue,
  },
  firstCard: cardStyle,
});
