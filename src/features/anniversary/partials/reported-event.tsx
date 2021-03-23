import React from 'react';
import { View } from 'react-native';

import { Icon, Text, TIconName } from '@covid/components';

import { TReportedEvent } from '../types';

interface IProps {
  reportedEvent: TReportedEvent;
}

function ReportedEvent({ reportedEvent }: IProps) {
  const getMappedIconName = (): TIconName => {
    switch (reportedEvent.eventBadge) {
      case 'DIET_AND_LIFESTYLE':
        return 'loose-weight-1';
      case 'GENERAL':
        return 'location';
      case 'HESITANCY':
        return 'chat-feedback';
      case 'MENTAL_HEALTH':
        return 'chat-medical';
      case 'SEVERITY':
        return 'life-insurance';
      case 'SYMPTOMS':
        return 'profile-info';
      case 'TEST_RESULTS':
        return 'plan';
      case 'TWO_PEOPLE':
        return 'people';
      case 'VACCINATION_STATUS':
        return 'syringe';
      case 'VACCINE_SIDE_EFFECTS':
        return 'dietary-inflammation-2';
    }
    return 'question-mark';
  };

  return (
    <View
      style={{
        alignItems: 'center',
        padding: 4,
      }}>
      <Icon iconName={getMappedIconName()} iconSize={24} style={{ marginBottom: 8 }} />
      <Text textClass="pXSmallMedium" textAlign="center">
        {reportedEvent.eventName}
      </Text>
    </View>
  );
}

export default ReportedEvent;
