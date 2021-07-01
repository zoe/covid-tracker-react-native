import { AsyncStorageService, DISMISSED_CALLOUTS, PersonalisedLocalData } from '@covid/core/AsyncStorageService';
import { contentService } from '@covid/core/content/ContentService';
import {
  IFeaturedContent,
  ITrendLineData,
  ITrendLineTimeSeriesData,
} from '@covid/core/content/dto/ContentAPIContracts';
import { predictiveMetricsClient } from '@covid/core/content/PredictiveMetricsClient';
import { RootState } from '@covid/core/state/root';
import { StartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { createAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';

// State interface

type ApiState = 'ready' | 'loading' | 'finished' | 'error';

export type ContentState = {
  // Startup info
  infoApiState: ApiState;
  startupInfo?: StartupInfo;
  personalizedLocalData?: PersonalisedLocalData;
  localTrendline?: ITrendLineData;

  // Featured content
  featuredHome: IFeaturedContent[];
  featuredThankyou: IFeaturedContent[];

  // Explore trend line screen
  exploreTrendline?: ITrendLineData;
  exploreTrendlineUpdating: boolean;

  // Metrics
  ukMetricsApiState: ApiState;
  ukActive?: string;
  ukDaily?: string;

  todayDate: string;

  dismissedCallouts: string[];
};

// Default state

const todaysDate = (): string => moment().format('dddd Do MMMM');

export const initialStateContent: ContentState = {
  dismissedCallouts: [],
  exploreTrendlineUpdating: false,
  featuredHome: [],
  featuredThankyou: [],
  infoApiState: 'ready',
  todayDate: todaysDate(),
  ukMetricsApiState: 'ready',
};

const getTrendLineDelta = (timeseries: ITrendLineTimeSeriesData[], from: number): number | undefined => {
  if (!timeseries || timeseries.length === 0) {
    return undefined;
  }
  const compareFromIndex = Math.min(timeseries.length, from);
  return Math.round(timeseries[0].value - timeseries[compareFromIndex].value);
};

// Async Actions

export const fetchDismissedCallouts = createAsyncThunk('content/dismissed_callouts', async (): Promise<
  Partial<ContentState>
> => {
  const arrayString = await AsyncStorageService.getItem<string>(DISMISSED_CALLOUTS);
  return {
    dismissedCallouts: arrayString ? (JSON.parse(arrayString) as string[]) : [],
  };
});

export const fetchStartUpInfo = createAsyncThunk('content/startup_info', async (): Promise<Partial<ContentState>> => {
  // TODO: refactor the ContentService - localData is a property set async on the class within getStartupInfo() (line 107)
  // TICKET: https://www.notion.so/joinzoe/Refactor-ContentService-7ea01969fff54f8299d53f95f05dcb6d
  const serviceData = await contentService.getStartupInfo();
  return {
    personalizedLocalData: contentService.localData,
    startupInfo: serviceData,
  };
});

export const fetchUKMetrics = createAsyncThunk('content/uk_metrics', async (): Promise<Partial<ContentState>> => {
  return {
    ukActive: (await predictiveMetricsClient.getActiveCases()) ?? undefined,
    ukDaily: (await predictiveMetricsClient.getDailyCases()) ?? undefined,
  };
});

export type FetchLocalTrendlinePayload = {
  localTrendline: ITrendLineData;
};

export const fetchLocalTrendLine = createAsyncThunk<Promise<Partial<ContentState>>>(
  'content/fetch_local_trend_line',
  async (): Promise<Partial<ContentState>> => {
    const { timeseries, ...trendline } = await contentService.getTrendLines();
    return {
      localTrendline: {
        delta: getTrendLineDelta(timeseries, 7),
        timeseries,
        ...trendline,
      },
    } as Partial<ContentState>;
  },
);

export const fetchFeaturedContent = createAsyncThunk('content/featured_content', async (): Promise<
  Partial<ContentState>
> => {
  try {
    const content = await contentService.getFeaturedContent();
    const sort = <T extends IFeaturedContent>(left: T, right: T): number =>
      left.order_index > right.order_index ? 1 : -1;
    const home = content.filter((item) => item.featured_uk_home === true).sort(sort);
    const thankyou = content.filter((item) => item.featured_uk_thankyou === true).sort(sort);
    return {
      featuredHome: home,
      featuredThankyou: thankyou,
    };
  } catch (_) {
    return {
      featuredHome: [],
      featuredThankyou: [],
    };
  }
});

export const searchTrendLine = createAsyncThunk('content/search_trend_line', async (query?: string): Promise<
  Partial<ContentState>
> => {
  const { timeseries, ...trendline } = await contentService.getTrendLines(query);
  return {
    exploreTrendline: {
      delta: getTrendLineDelta(timeseries, 7),
      timeseries,
      ...trendline,
    },
  };
});

export const updateTodayDate = createAction('context/update_today_date');
export const addDismissCallout = createAction<string>('content/dismissed_callout');

// Slice (Store, Reducer, Actions etc...)

export const contentSlice = createSlice({
  extraReducers: {
    [updateTodayDate.type]: (current) => {
      current.todayDate = todaysDate();
    },
    [addDismissCallout.type]: (current, action: PayloadAction<string>) => {
      if (!current.dismissedCallouts.includes(action.payload)) {
        current.dismissedCallouts = [...current.dismissedCallouts, action.payload];
        AsyncStorageService.setItem(JSON.stringify(current.dismissedCallouts), DISMISSED_CALLOUTS);
      }
    },
    // StartUpInfo reducers
    [fetchStartUpInfo.pending.type]: (current) => {
      current.infoApiState = 'loading';
    },
    [fetchStartUpInfo.rejected.type]: (current) => {
      current.infoApiState = 'error';
    },
    [fetchStartUpInfo.fulfilled.type]: (current, action: { payload: Partial<ContentState> }) => {
      current.infoApiState = !action.payload ? 'error' : 'finished';
      const { startupInfo, personalizedLocalData } = action.payload;
      current.startupInfo = startupInfo;
      current.personalizedLocalData = personalizedLocalData;
    },

    // DismissedCallouts reducer
    [fetchDismissedCallouts.fulfilled.type]: (current, action: { payload: Partial<ContentState> }) => {
      current.dismissedCallouts = action.payload.dismissedCallouts ?? [];
    },

    // UK Predictive Metrics reducers
    [fetchUKMetrics.pending.type]: (current) => {
      current.ukMetricsApiState = 'loading';
    },
    [fetchUKMetrics.rejected.type]: (current) => {
      current.ukMetricsApiState = 'error';
    },
    [fetchUKMetrics.fulfilled.type]: (current, action: { payload: Partial<ContentState> }) => {
      current.ukMetricsApiState = !action.payload ? 'error' : 'finished';
      const { ukActive, ukDaily } = action.payload;
      current.ukActive = ukActive;
      current.ukDaily = ukDaily;
    },

    // Featured content
    [fetchFeaturedContent.fulfilled.type]: (current, action: { payload: Partial<ContentState> }) => {
      current.featuredHome = action.payload?.featuredHome ?? [];
      current.featuredThankyou = action.payload?.featuredThankyou ?? [];
    },

    // Trendline data
    [fetchLocalTrendLine.fulfilled.type]: (current, action: { payload: Partial<ContentState> }) => {
      current.localTrendline = action.payload?.localTrendline;
      current.exploreTrendline = action.payload?.localTrendline;
    },

    [searchTrendLine.fulfilled.type]: (current, action: { payload: Partial<ContentState> }) => {
      current.exploreTrendline = action.payload?.exploreTrendline;
      current.exploreTrendlineUpdating = false;
    },
    [searchTrendLine.pending.type]: (current) => {
      current.exploreTrendlineUpdating = true;
    },
    [searchTrendLine.rejected.type]: (current) => {
      current.exploreTrendlineUpdating = false;
    },
  },
  initialState: initialStateContent,
  name: 'content',
  reducers: {},
});

export const selectContent = (state: RootState) => state.content;
