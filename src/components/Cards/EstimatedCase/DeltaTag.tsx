import React from 'react';
import { View, StyleSheet } from 'react-native';

import { colors } from '@theme';
import i18n from '@covid/locale/i18n';
import { ArrowDown, ArrowUp } from '@assets';

import { Text } from '../../typography';

interface IProps {
  change: number;
}

enum DeltaChange {
  up,
  down,
  none,
}
export function DeltaTag({ change }: IProps) {
  const changeType = change >= 0 ? DeltaChange.up : DeltaChange.down;
  const from = i18n.t('dashboard.trendline-card.delta.from-last-week');

  const config = () => {
    switch (changeType) {
      case DeltaChange.up:
        return {
          text: `${i18n.t('dashboard.trendline-card.delta.up')} ${change}`,
          icon: <ArrowUp color={colors.red} />,
          color: styles.up,
        };
      case DeltaChange.down:
        return {
          text: `${i18n.t('dashboard.trendline-card.delta.down')} ${Math.abs(change)}`,
          icon: <ArrowDown color={colors.green} />,
          color: styles.down,
        };
      case DeltaChange.none:
        return {
          text: i18n.t('dashboard.trendline-card.delta.none'),
          icon: null,
          color: styles.none,
        };
    }
  };

  const { color, icon, text } = config();
  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={[styles.tag, color]}>
        <View style={styles.icon}>{icon}</View>
        <Text textClass="pSmall" style={{ color: color.color }}>{`${text} ${from}`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  up: {
    borderColor: colors.red,
    color: colors.red,
  },
  down: {
    borderColor: colors.green,
    color: colors.green,
  },
  none: {
    borderColor: colors.tertiary,
    color: colors.tertiary,
  },
  icon: {
    marginTop: 4,
    marginRight: 6,
  },
  muted: {
    fontSize: 14,
    paddingTop: 2,
  },
});
