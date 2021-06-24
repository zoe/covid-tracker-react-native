import { Text } from '@covid/components';
import { TTimelineEvent } from '@covid/features/anniversary/types';
import moment from 'moment';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

interface IProps {
  timelineEvent: TTimelineEvent;
  dateFormat?: string;
}

function TimelineNode({ timelineEvent, dateFormat = 'Do MMMM YYYY' }: IProps) {
  return (
    <View accessible style={[styles.container]}>
      <View style={styles.row}>
        <View style={styles.node} />
        <Text style={styles.date} textClass="pSmall">
          {moment(timelineEvent.date).format(dateFormat)}
        </Text>
      </View>
      <View style={styles.body}>
        {timelineEvent.title ? <Text textClass="h5Light">{timelineEvent.title}</Text> : null}
        {timelineEvent.sub_title ? <Text textClass="h5Medium">{timelineEvent.sub_title}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    marginBottom: 48,
    marginLeft: 24,
    marginTop: 8,
  },
  container: {
    marginLeft: 11,
  },
  date: {
    color: '#0165B5',
  },
  node: {
    backgroundColor: '#0165B5',
    borderRadius: 5,
    height: 12,
    marginRight: 12,
    width: 12,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default TimelineNode;
