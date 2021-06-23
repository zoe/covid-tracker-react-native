import { ArrowDown, ArrowUp } from '@assets';
import { Text } from '@covid/components/typography';
import i18n from '@covid/locale/i18n';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

interface IProps {
  change: number;
}

export function DeltaTag({ change }: IProps) {
  const from = i18n.t('dashboard.trendline-card.delta.from-last-week');

  const { color, icon, text } =
    change >= 0
      ? {
          color: styles.up,
          icon: <ArrowUp color={colors.red} />,
          text: `${i18n.t('dashboard.trendline-card.delta.up')} ${change}`,
        }
      : {
          color: styles.down,
          icon: <ArrowDown color={colors.green} />,
          text: `${i18n.t('dashboard.trendline-card.delta.down')} ${Math.abs(change)}`,
        };

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
