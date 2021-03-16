import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { colors } from '@theme';
import i18n from '@covid/locale/i18n';

import { RegularBoldText } from '../Text';

interface IProps {
  area: string;
}

export function PeopleWithSymptomsText({ area }: IProps) {
  return (
    <Text style={styles.estimatedCases}>
      {i18n.t('thank-you.people-with-covid-in')}
      <RegularBoldText>{area}</RegularBoldText> + {i18n.t('thank-you.today')}
    </Text>
  );
}

const styles = StyleSheet.create({
  estimatedCases: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.primary,
    textAlign: 'center',
  },
});
