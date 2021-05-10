import { Icon, Text, TIconName } from '@covid/components';
import React from 'react';
import { View } from 'react-native';

import { TReportedEvent } from '../types';

interface IProps {
  reportedEvent: TReportedEvent;
}

function ReportedEvent({ reportedEvent }: IProps) {
  const getMappedIconName = (): TIconName => {
    switch (reportedEvent.id) {
      case 'DIET_AND_LIFESTYLE':
        return 'loose-weight-1';
      case 'GENERAL':
        return 'location';
      case 'HESITANCY':
        return 'chat-feedback';
      case 'MENTAL_HEALTH':
        return 'chat-medical';
      case 'SYMPTOMS':
        return 'life-insurance';
      case 'DAILY_HEALTH':
        return 'profile-info';
      case 'TEST_RESULTS':
        return 'plan';
      case 'TWO_PEOPLE':
        return 'people';
      case 'VACCINATION_STATUS':
        return 'syringe';
      case 'VACCINE_SIDE_EFFECTS':
        return 'dietary-inflammation-2';
      default:
        return 'combine';
    }
  };

  return (
    <View
      accessible
      style={{
        alignItems: 'center',
        padding: 4,
      }}
    >
      <Icon iconName={getMappedIconName()} iconSize={24} style={{ marginBottom: 10 }} />
      <Text textAlign="center" textClass="pXSmallMedium">
        {reportedEvent.text}
      </Text>
    </View>
  );
}

export default ReportedEvent;
