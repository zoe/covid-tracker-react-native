import React from 'react';
import { View } from 'react-native';

import { Icon, Text, TIconName } from '@covid/components';

export type TReportedEvent = {
  iconName: TIconName;
  eventName: string;
};

interface IProps {
  active?: boolean;
  reportedEvent: TReportedEvent;
}

function ReportedEvent({ active = true, reportedEvent }: IProps) {
  return (
    <View
      style={{
        alignItems: 'center',
        opacity: active ? 1 : 0.2,
        padding: 4,
      }}>
      <Icon iconName={reportedEvent.iconName} iconSize={24} style={{ marginBottom: 8 }} />
      <Text textClass="pXSmallMedium" textAlign="center">
        {reportedEvent.eventName}
      </Text>
    </View>
  );
}

export default ReportedEvent;
