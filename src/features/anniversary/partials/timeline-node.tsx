import React from 'react';
import { View, StyleSheet } from 'react-native';
import moment from 'moment';

import { Text } from '@covid/components';

import { TTimelineEvent } from '../types';

interface IProps {
  timelineEvent: TTimelineEvent;
  dateFormat?: string;
}

function TimelineNode({ timelineEvent, dateFormat = 'Do MMMM YYYY' }: IProps) {
  return (
    <View style={[styles.container]} accessible>
      <View style={styles.row}>
        <View style={styles.node} />
        <Text textClass="pSmall" style={styles.date}>
          {moment(timelineEvent.date).format(dateFormat)}
        </Text>
      </View>
      <View style={styles.body}>
        {!!timelineEvent.title ? <Text textClass="h5Light">{timelineEvent.title}</Text> : null}
        {!!timelineEvent.sub_title ? <Text textClass="h5Medium">{timelineEvent.sub_title}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 11,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  node: {
    backgroundColor: '#0165B5',
    borderRadius: 5,
    height: 12,
    marginRight: 12,
    width: 12,
  },
  date: {
    color: '#0165B5',
  },
  body: {
    marginLeft: 24,
    marginTop: 8,
    marginBottom: 48,
  },
});

export default TimelineNode;
