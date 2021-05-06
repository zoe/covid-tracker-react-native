import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Icon, Text } from '@covid/components';

import { TTimelineEvent, TProgress } from '../types';

import ProgressBars from './ProgressBars';

interface IProps {
  timelineEvent: TTimelineEvent;
}

function getProgressArray(progress: TProgress | null | undefined): TProgress[] {
  switch (progress) {
    case 'DISCOVERY':
      return ['DISCOVERY', 'NOT_STARTED', 'NOT_STARTED', 'NOT_STARTED'];
    case 'DATA_COLLECTION':
      return ['COMPLETED', 'DATA_COLLECTION', 'NOT_STARTED', 'NOT_STARTED'];
    case 'ANALYSIS':
      return ['COMPLETED', 'COMPLETED', 'ANALYSIS', 'NOT_STARTED'];
    case 'COMPLETED':
      return ['COMPLETED', 'COMPLETED', 'COMPLETED', 'COMPLETED'];
    case 'NOT_STARTED':
    default:
      return ['NOT_STARTED', 'NOT_STARTED', 'NOT_STARTED', 'NOT_STARTED'];
  }
}

function StudyCard({ timelineEvent }: IProps) {
  const { ongoing, progress, sub_title, summary, title } = timelineEvent;
  const p: TProgress[] = getProgressArray(progress);
  const opacity = ongoing === 'ONGOING' ? 1 : 0.4;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Icon
          iconName={ongoing === 'ONGOING' ? 'search' : 'placeholder-2'}
          iconSize={18}
          style={{ marginTop: 4, opacity }}
        />
        <Text textClass="pLight" style={{ color: '#24262B', marginLeft: 12, opacity }}>
          {title}
        </Text>
      </View>
      {sub_title && (
        <Text textClass="h5Medium" style={[styles.body, { opacity }]}>
          {sub_title}
        </Text>
      )}
      <ProgressBars progress={p} />
      {summary && (
        <Text style={{ color: '#024364', marginTop: 12 }} textClass="pLight">
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
