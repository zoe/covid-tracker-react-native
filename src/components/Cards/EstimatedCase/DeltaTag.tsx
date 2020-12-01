import React from 'react';
import { View, StyleSheet } from 'react-native';

import { CaptionText } from '@covid/components/Text';
import { colors } from '@theme';
import i18n from '@covid/locale/i18n';
import { ArrowDown, ArrowUp } from '@assets';

interface Props {
  change: number;
}

enum DeltaChange {
  up,
  down,
  none,
}
export const DeltaTag: React.FC<Props> = ({ change }) => {
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

  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={[styles.tag, config().color]}>
        <View style={styles.icon}>{config().icon}</View>
        <CaptionText style={[config().color]}>{`${config().text} ${from}`}</CaptionText>
      </View>
    </View>
  );
};

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
