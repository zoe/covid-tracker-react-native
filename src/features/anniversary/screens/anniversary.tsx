import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, Alert } from 'react-native';

import ApiClient from '@covid/core/api/ApiClient';

import {
  LoadingIndicator,
  ReportCard,
  Timeline,
  TimelineIntroduction,
  TimelineHeader,
  TimelineFooter,
  TimelineError,
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
    console.log('get timeline');
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
    <SafeAreaView style={{ backgroundColor: '#EEEEEF' }}>
      <TimelineHeader />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item: TRowItem) => item.id}
        style={{ backgroundColor: '#EEEEEF' }}
      />
    </SafeAreaView>
  );
}

export default Anniversary;
