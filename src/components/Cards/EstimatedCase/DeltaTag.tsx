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
}
export const DeltaTag: React.FC<Props> = ({ change }) => {
  const changeType = change >= 0 ? DeltaChange.up : DeltaChange.down;
  const text =
    changeType === DeltaChange.up
      ? i18n.t('dashboard.trendline-card.delta.up')
      : i18n.t('dashboard.trendline-card.delta.down');
  const colorStyle = changeType === DeltaChange.up ? styles.up : styles.down;
  const from = i18n.t('dashboard.trendline-card.delta.from-last-week');
  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={[styles.tag, colorStyle]}>
        {changeType === DeltaChange.up && <ArrowUp style={styles.icon} />}
        {changeType === DeltaChange.down && <ArrowDown style={styles.icon} />}
        <CaptionText style={{ color: 'white' }}>{`${text} ${change}`}</CaptionText>
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
  icon: {
    marginTop: 4,
    marginRight: 6,
  },
  muted: {
    fontSize: 14,
    paddingTop: 2,
  },
});
