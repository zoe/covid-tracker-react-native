import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Icon, Text } from '@covid/components';

import { TTimelineEvent, TProgress } from '../types';

import ProgressBars from './progress-bars';

interface IProps {
  timelineEvent: TTimelineEvent;
}

function StudyCard({ timelineEvent }: IProps) {
  const { ongoing, progress, sub_title, summary, title } = timelineEvent;
  const p: TProgress[] = progress ? progress : ['NOT_STARTED', 'NOT_STARTED', 'NOT_STARTED', 'NOT_STARTED'];
  const opacity = ongoing === 'ONGOING' ? 1 : 0.4;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Icon
          iconName={ongoing === 'ONGOING' ? 'search' : 'placeholder-2'}
          iconSize={18}
          style={{ marginTop: 4, opacity }}
        />
        <Text textClass="pBold" style={{ color: '#24262B', marginLeft: 12, opacity }}>
          {title}
        </Text>
      </View>
      {sub_title && (
        <Text textClass="h5Light" style={[styles.body, { opacity }]}>
          {sub_title}
        </Text>
      )}
      <ProgressBars progress={p} />
      {summary && (
        <Text style={{ color: '#024364', marginTop: 12 }} textClass="pMedium">
          {summary}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 48,
    padding: 16,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  body: {
    marginBottom: 24,
    marginTop: 12,
  },
});

export default StudyCard;
