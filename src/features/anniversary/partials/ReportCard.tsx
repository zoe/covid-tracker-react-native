import { SolidColorBar, Text } from '@covid/components';
import { TReportedEvent } from '@covid/features/anniversary/types';
import { useTheme } from '@covid/themes';
import { colors } from '@theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import ReportedEvent from './ReportedEvent';

interface IProps {
  reportedEvents: TReportedEvent[];
}

function ReportCard({ reportedEvents }: IProps) {
  const { grid } = useTheme();
  return (
    <View style={[styles.container, { paddingHorizontal: grid.gutter }]}>
      <Text rhythm={24} textClass="h4">
        Thanks for reporting
      </Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 24 }}>
        {reportedEvents.map((reportedEvent, index) => {
          const key = `reported-event-${index}`;
          return (
            <View key={key} style={{ paddingBottom: 16, width: '33%' }}>
              <ReportedEvent reportedEvent={reportedEvent} />
            </View>
          );
        })}
      </View>
      <SolidColorBar backgroundColor={colors.tertiary} height={1} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    paddingVertical: 24,
  },
});

export default ReportCard;
