import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Icon, Text, TIconName } from '@covid/components';

import { TTimelineEvent } from '../types';

interface IProps {
  timelineEvent: TTimelineEvent;
}

function Highlight({ timelineEvent }: IProps) {
  const { ongoing, title } = timelineEvent;
  const iconName: TIconName = ongoing === 'ONGOING' ? 'blog' : 'noun_Crystal-Ball_3517088-1';
  const iconSize = ongoing === 'ONGOING' ? 18 : 24; // compensate for smaller icon
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.circle}>
          <Icon iconName={iconName} iconSize={iconSize} iconStyle={{ color: '#0165B5' }} />
        </View>
        <Text textClass="h4" style={{ color: '#0165B5', marginLeft: 12 }}>
          {title}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 48,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  circle: {
    alignItems: 'center',
    backgroundColor: '#EEEEEF',
    borderRadius: 16,
    justifyContent: 'center',
    height: 32,
    width: 32,
  },
});

export default Highlight;
