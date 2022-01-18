import Icon from '@covid/components/icons/Icon';
import { Text } from '@covid/components/typography';
import { TProgress, TTimelineEvent } from '@covid/features/anniversary/types';
import { sizes } from '@covid/themes';
import { colors } from '@theme/colors';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

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

export default function StudyCard({ timelineEvent }: IProps) {
  const p: TProgress[] = getProgressArray(timelineEvent.progress);
  const opacity = timelineEvent.ongoing === 'ONGOING' ? 1 : 0.4;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Icon
          iconName={timelineEvent.ongoing === 'ONGOING' ? 'search' : 'placeholder-2'}
          iconSize={18}
          style={{ marginTop: sizes.xxs, opacity }}
        />
        <Text style={{ color: colors.textDark, marginLeft: sizes.s, opacity }} textClass="pLight">
          {timelineEvent.title}
        </Text>
      </View>
      {timelineEvent.sub_title ? (
        <Text style={[styles.body, { opacity }]} textClass="h5Medium">
          {timelineEvent.sub_title}
        </Text>
      ) : null}
      <ProgressBars progress={p} />
      {timelineEvent.summary ? (
        <Text style={{ color: colors.brand, marginTop: sizes.s }} textClass="pLight">
          {timelineEvent.summary}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    marginBottom: sizes.l,
    marginTop: sizes.s,
  },
  container: {
    backgroundColor: 'white',
    borderRadius: sizes.m,
    marginBottom: sizes.xxl,
    padding: sizes.m,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
