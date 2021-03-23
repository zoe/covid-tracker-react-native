import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '@covid/components';

import { TReportedEvent } from '../types';

import ReportedEvent from './reported-event';

interface IProps {
  reportedEvents: TReportedEvent[];
}

function ReportCard({ reportedEvents }: IProps) {
  return (
    <View style={[styles.container]}>
      <Text rhythm={20} textClass="h4">
        Thanks for reporting
      </Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {reportedEvents.map((reportedEvent, index) => {
          const key = `reported-event-${index}`;
          return (
            <View key={key} style={{ paddingBottom: 16, width: '33%' }}>
              <ReportedEvent reportedEvent={reportedEvent} active />
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 2,
    borderBottomColor: '#E2E2E2',
    marginBottom: 48,
    paddingVertical: 24,
  },
});

export default ReportCard;
