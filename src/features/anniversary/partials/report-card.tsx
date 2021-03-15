import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '@covid/components';

import ReportedEvent, { TReportedEvent } from './reported-event';

function ReportCard() {
  const reportedEvents: TReportedEvent[] = [
    {
      iconName: 'profile-info',
      eventName: 'Symptoms',
    },
    {
      iconName: 'plan',
      eventName: 'Test results Test results',
    },
    {
      iconName: 'syringe',
      eventName: 'Disease Outcome',
    },
    {
      iconName: 'sort-cards',
      eventName: 'Vaccine Doses',
    },
    {
      iconName: 'dietary-inflammation-2',
      eventName: 'Vaccine Effects',
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
      eventName: 'Mental Health Factors',
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
          const active = Math.round(Math.random() * 2);
          return (
            <View key={key} style={{ paddingBottom: 16, width: '33%' }}>
              <ReportedEvent reportedEvent={reportedEvent} active={!!(active % 2)} />
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
