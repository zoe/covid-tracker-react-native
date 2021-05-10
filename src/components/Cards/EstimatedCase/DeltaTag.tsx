import { ArrowDown, ArrowUp } from '@assets';
import i18n from '@covid/locale/i18n';
import { colors } from '@theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';

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
          color: styles.up,
          icon: <ArrowUp color={colors.red} />,
          text: `${i18n.t('dashboard.trendline-card.delta.up')} ${change}`,
        };
      case DeltaChange.down:
        return {
          color: styles.down,
          icon: <ArrowDown color={colors.green} />,
          text: `${i18n.t('dashboard.trendline-card.delta.down')} ${Math.abs(change)}`,
        };
      case DeltaChange.none:
        return {
          color: styles.none,
          icon: null,
          text: i18n.t('dashboard.trendline-card.delta.none'),
        };
    }
  };

  const { color, icon, text } = config();
  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={[styles.tag, color]}>
        <View style={styles.icon}>{icon}</View>
        <Text style={{ color: color.color }} textClass="pSmall">{`${text} ${from}`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  down: {
    borderColor: colors.green,
    color: colors.green,
  },
  icon: {
    marginRight: 6,
    marginTop: 4,
  },
  muted: {
    fontSize: 14,
    paddingTop: 2,
  },
  none: {
    borderColor: colors.tertiary,
    color: colors.tertiary,
  },
  tag: {
    borderRadius: 6,
    borderWidth: 1,
    flexDirection: 'row',
    marginRight: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  up: {
    borderColor: colors.red,
    color: colors.red,
  },
});
