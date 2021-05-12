import { Icon, Text, TIconName } from '@covid/components';
import React from 'react';
import { StyleSheet, View } from 'react-native';

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
        <Text style={{ color: '#0165B5', marginLeft: 12 }} textClass="h4">
          {title}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    backgroundColor: '#EEEEEF',
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  container: {
    marginBottom: 48,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default Highlight;
