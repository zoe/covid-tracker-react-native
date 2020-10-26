import React from 'react';
import { View, StyleSheet } from 'react-native';

import { MutedText, CaptionText } from '@covid/components/Text';
import { colors } from '@theme';
import ArrowUp from '@assets/icons/stats/arrow-up.svg';
import ArrowDown from '@assets/icons/stats/arrow-down.svg';
import i18n from '@covid/locale/i18n';

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
          icon: <ArrowUp style={styles.icon} />,
          color: styles.up,
        };
      case DeltaChange.down:
        return {
          text: `${i18n.t('dashboard.trendline-card.delta.down')} ${Math.abs(change)}`,
          icon: <ArrowDown style={styles.icon} />,
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
        {config().icon}
        <CaptionText style={{ color: 'white' }}>{config().text}</CaptionText>
      </View>
      <MutedText style={styles.muted}>{from}</MutedText>
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    flexDirection: 'row',
    backgroundColor: colors.red,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  up: {
    backgroundColor: colors.red,
  },
  down: {
    backgroundColor: colors.green,
  },
  none: {
    backgroundColor: colors.tertiary,
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
