import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '@covid/components';

import ReportedEvent, { TReportedEvent } from './reported-event';

function ReportCard() {
  const reportedEvents: TReportedEvent[] = [
    {
      iconName: 'location',
      eventName: 'Demographics & general health',
    },
    {
      iconName: 'profile-info',
      eventName: 'Symptoms',
    },
    {
      iconName: 'people',
      eventName: 'For two people',
    },
    {
      iconName: 'life-insurance',
      eventName: 'Covid severity',
    },
    {
      iconName: 'plan',
      eventName: 'Test results',
    },
    {
      iconName: 'syringe',
      eventName: 'Vaccine status',
    },
    {
      iconName: 'dietary-inflammation-2',
      eventName: 'Vaccine side effects',
    },
    {
      iconName: 'chat-feedback',
      eventName: 'Vaccine hesitancy',
    },
    {
      iconName: 'loose-weight-1',
      eventName: 'Diet & Lifestyle',
    },
    {
      iconName: 'chat-medical',
      eventName: 'Mental Health',
    },
  ];
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
