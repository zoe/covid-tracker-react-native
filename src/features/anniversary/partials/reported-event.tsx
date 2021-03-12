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
    <View style={{ opacity: active ? 1 : 0.2 }}>
      <Icon iconName={reportedEvent.iconName} iconSize={24} style={{ marginBottom: 8 }} />
      <Text textClass="pSmall">{reportedEvent.eventName}</Text>
    </View>
  );
}

export default ReportedEvent;
