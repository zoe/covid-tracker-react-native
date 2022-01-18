import { covidByZoeIconDark } from '@assets';
import { NavHeader } from '@covid/components/NavHeader';
import { Screen } from '@covid/components/Screen';
import ApiClient from '@covid/core/api/ApiClient';
import {
  LoadingIndicator,
  ReportCard,
  Timeline,
  TimelineError,
  TimelineFooter,
  TimelineIntroduction,
} from '@covid/features/anniversary/partials';
import { ITimeline } from '@covid/features/anniversary/types';
import { sizes } from '@covid/themes';
import { colors } from '@theme/colors';
import * as React from 'react';
import { Alert, FlatList, Image, StyleSheet } from 'react-native';

type TRowType = 'ERROR' | 'FOOTER' | 'INTRODUCTION' | 'LOADER' | 'REPORT_CARD' | 'TIMELINE';

type TRowItem = {
  id: TRowType;
};

function keyExtractor(item: TRowItem) {
  return item.id;
}

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

function renderHeader() {
  return <NavHeader rightElement={<Image source={covidByZoeIconDark} style={styles.image} />} />;
}

export default function AnniversaryScreen() {
  const [timeline, setTimeline] = React.useState<ITimeline>();
  const [hasError, setHasError] = React.useState(false);

  const getTimeline = async (): Promise<ITimeline> => {
    const client = new ApiClient();
    const response = await client.get<ITimeline>('timeline/');
    return response;
  };

  React.useEffect(() => {
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
        return hasError ? <TimelineError /> : null;
      case 'INTRODUCTION':
        return <TimelineIntroduction />;
      case 'LOADER':
        return timeline || hasError ? null : <LoadingIndicator />;
      case 'REPORT_CARD':
        return timeline ? <ReportCard reportedEvents={timeline.badges} /> : null;
      case 'TIMELINE':
        return timeline ? <Timeline timelineEvents={timeline.items} /> : null;
      case 'FOOTER':
        return timeline ? <TimelineFooter /> : null;
      default:
        return null;
    }
  };

  return (
    <Screen
      noScrollView
      backgroundColor={colors.backgroundTertiary}
      renderHeader={renderHeader}
      testID="anniversary-screen"
    >
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        style={styles.backgroundColor}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  backgroundColor: {
    backgroundColor: colors.backgroundTertiary,
  },
  contentContainer: {
    paddingBottom: sizes.screenVerticalPadding,
    paddingHorizontal: sizes.screenHorizontalPadding,
  },
  image: {
    aspectRatio: 2.25,
    height: undefined,
    resizeMode: 'contain',
    width: 75,
  },
});
