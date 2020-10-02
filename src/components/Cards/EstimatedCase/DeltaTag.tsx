import React from 'react';
import { View, StyleSheet } from 'react-native';

import { MutedText, CaptionText } from '@covid/components/Text';
import { colors, fontStyles } from '@theme';
import ArrowUp from '@assets/icons/stats/arrow-up.svg';

interface Props {
  change: number;
  from: string;
}

export const DeltaTag: React.FC<Props> = ({ change, from }) => {
  const text = change > 0 ? 'Up by' : 'Down by'
  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={styles.tag}>
        <ArrowUp style={styles.icon} />
        <CaptionText style={{ color: 'white' }}>{`${text} ${change}`}</CaptionText>
      </View>
      <MutedText style={styles.muted}>{`from ${from}`}</MutedText>
    </View>
  )
}

const styles = StyleSheet.create({
  tag: {
    flexDirection: 'row',
    backgroundColor: colors.red,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8
  },
  icon: {
    marginTop: 4,
    marginRight: 6
  },
  muted: {
    fontSize: 14,
    paddingTop: 2
  }
})