import React from 'react';
import { View, StyleSheet } from 'react-native';

import { MutedText, CaptionText } from '@covid/components/Text';
import { colors, fontStyles } from '@theme';
import ArrowUp from '@assets/icons/stats/arrow-up.svg';
import ArrowDown from '@assets/icons/stats/arrow-down.svg';

interface Props {
  change: number;
  from: string;
}

enum DeltaChange {
  up, down
}
export const DeltaTag: React.FC<Props> = ({ change, from }) => {
  const changeType = change > 0 ? DeltaChange.up : DeltaChange.down
  const text = changeType === DeltaChange.up ? 'Up by' : 'Down by';
  const colorStyle = changeType === DeltaChange.up ? styles.up : styles.down
  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={[styles.tag, colorStyle]}>
        {
          change >= 0 && <ArrowUp style={styles.icon} />
        }
        {
          change < 0 && <ArrowDown style={styles.icon} />
        }
        <CaptionText style={{ color: 'white' }}>{`${text} ${change}`}</CaptionText>
      </View>
      <MutedText style={styles.muted}>{`from ${from}`}</MutedText>
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
    backgroundColor: colors.green
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
