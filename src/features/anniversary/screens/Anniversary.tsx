import ApiClient from '@covid/core/api/ApiClient';
import { colors } from '@theme/colors';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, SafeAreaView } from 'react-native';

import {
  LoadingIndicator,
  ReportCard,
  Timeline,
  TimelineError,
  TimelineFooter,
  TimelineHeader,
  TimelineIntroduction,
} from '../partials';
import { ITimeline } from '../types';

type TRowType = 'ERROR' | 'FOOTER' | 'INTRODUCTION' | 'LOADER' | 'REPORT_CARD' | 'TIMELINE';

type TRowItem = {
  id: TRowType;
};

function Anniversary() {
  const [timeline, setTimeline] = useState<ITimeline>();
  const [hasError, setHasError] = useState(false);

  const getTimeline = async (): Promise<ITimeline> => {
    const client = new ApiClient();
    const response = await client.get<ITimeline>('timeline/');
    return response;
  };

  useEffect(() => {
    try {
      getTimeline()
        .then((res) => {
          setTimeline(res);
        })
        .catch(() => {
          Alert.alert('Error loading timeline');
          setHasError(true);
        });
    } catch (error) {
      setHasError(true);
    }
  }, []);

  const renderItem = ({ item }: { item: TRowItem }) => {
    switch (item.id) {
      case 'ERROR':
        return <>{hasError ? <TimelineError /> : null}</>;
      case 'INTRODUCTION':
        return <TimelineIntroduction />;
      case 'LOADER':
        return <>{timeline || hasError ? null : <LoadingIndicator />}</>;
      case 'REPORT_CARD':
        return <>{timeline ? <ReportCard reportedEvents={timeline.badges} /> : null}</>;
      case 'TIMELINE':
        return <>{timeline ? <Timeline timelineEvents={timeline.items} /> : null}</>;
      case 'FOOTER':
        return <>{timeline ? <TimelineFooter /> : null}</>;
      default:
        return null;
    }
  };

  const data: TRowItem[] = [
    {
      id: 'INTRODUCTION',
    },
    {
      id: 'LOADER',
    },
    {
      id: 'ERROR',
    },
    {
      id: 'REPORT_CARD',
    },
    {
      id: 'TIMELINE',
    },
    {
      id: 'FOOTER',
    },
  ];

  return (
    <SafeAreaView style={{ backgroundColor: colors.backgroundTertiary }}>
      <TimelineHeader />
      <FlatList
        data={data}
        keyExtractor={(item: TRowItem) => item.id}
        renderItem={renderItem}
        style={{ backgroundColor: colors.backgroundTertiary }}
      />
    </SafeAreaView>
  );
}

export default Anniversary;
