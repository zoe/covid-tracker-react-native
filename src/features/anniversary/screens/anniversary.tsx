import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, ListRenderItem } from 'react-native';

import ApiClient from '@covid/core/api/ApiClient';

import {
  LoadingIndicator,
  ReportCard,
  Timeline,
  TimelineIntroduction,
  TimelineHeader,
  TimelineFooter,
} from '../partials';
import { ITimeline } from '../types';

type TRowType = 'FOOTER' | 'INTRODUCTION' | 'LOADER' | 'REPORT_CARD' | 'TIMELINE';

type TRowItem = {
  id: TRowType;
};

function Anniversary() {
  const [timeline, setTimeline] = useState<ITimeline>();

  const getTimeline = async (): Promise<ITimeline[]> => {
    const client = new ApiClient();
    const response = await client.get<ITimeline[]>('timeline/');
    return response;
  };

  useEffect(() => {
    try {
      getTimeline().then((res) => {
        setTimeline(res[0]);
      });
    } catch (error) {
      // TODO - HAND ERROR NICELY
    }
  }, []);

  const renderItem = ({ item }: { item: TRowItem }) => {
    switch (item.id) {
      case 'INTRODUCTION':
        return <TimelineIntroduction />;
      case 'LOADER':
        return <>{timeline ? null : <LoadingIndicator />}</>;
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
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <TimelineHeader />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(Item) => Item.id}
        style={{ backgroundColor: '#EEEEEF' }}
      />
    </SafeAreaView>
  );
}

export default Anniversary;
