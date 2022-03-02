import { AsyncStorageService, DISMISSED_CALLOUTS, TPersonalisedLocalData } from '@covid/core/AsyncStorageService';
import { contentService } from '@covid/core/content/ContentService';
import {
  IFeaturedContent,
  ITrendlineData,
  ITrendlineTimeSeriesData,
  TNewlySymptomaticDataPoint,
} from '@covid/core/content/dto/ContentAPIContracts';
import { predictiveMetricsClient } from '@covid/core/content/PredictiveMetricsClient';
import { TRegionItem } from '@covid/core/state/content/types';
import { TRootState } from '@covid/core/state/root';
import { TActiveNotifications, TShowModal, TStartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { createAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';

type TApiState = 'ready' | 'loading' | 'finished' | 'error';

export type TStateContent = {
  // Startup info
  infoApiState: TApiState;
  localTrendline?: ITrendlineData;
  newlySymptomaticChartData?: TNewlySymptomaticDataPoint[];
  personalizedLocalData?: TPersonalisedLocalData;
  selectedRegionItem?: TRegionItem;
  startupInfo?: TStartupInfo;

  // Featured content
  featuredHome: IFeaturedContent[];
  featuredThankyou: IFeaturedContent[];

  // Metrics
  ukMetricsApiState: TApiState;
  ukActive?: string;
  ukDaily?: string;

  todayDate: string;

  dismissedCallouts: string[];
};

// Default state

const todaysDate = (): string => moment().format('dddd Do MMMM');

export const initialStateContent: TStateContent = {
  dismissedCallouts: [],
  featuredHome: [],
  featuredThankyou: [],
  infoApiState: 'ready',
  newlySymptomaticChartData: [],
  todayDate: todaysDate(),
  ukMetricsApiState: 'ready',
};

const getTrendlineDelta = (timeseries: ITrendlineTimeSeriesData[], from: number): number | undefined => {
  if (!timeseries || timeseries.length === 0) {
    return undefined;
  }
  const compareFromIndex = Math.min(timeseries.length, from);
  return Math.round(timeseries[0].value - timeseries[compareFromIndex].value);
};

// Async Actions

export const fetchDismissedCallouts = createAsyncThunk('content/dismissed_callouts', async (): Promise<
  Partial<TStateContent>
> => {
  const arrayString = await AsyncStorageService.getItem<string>(DISMISSED_CALLOUTS);
  return {
    dismissedCallouts: arrayString ? (JSON.parse(arrayString) as string[]) : [],
  };
});

export const fetchStartupInfo = createAsyncThunk('content/startup_info', async (): Promise<Partial<TStateContent>> => {
  // TODO: refactor the ContentService - localData is a property set async on the class within getStartupInfo() (line 107)
  // TICKET: https://www.notion.so/joinzoe/Refactor-ContentService-7ea01969fff54f8299d53f95f05dcb6d
  const startupInfo = await contentService.getStartupInfo();
  return {
    personalizedLocalData: contentService.localData,
    startupInfo,
  };
});

export const fetchUKMetrics = createAsyncThunk('content/uk_metrics', async (): Promise<Partial<TStateContent>> => {
  return {
    ukActive: (await predictiveMetricsClient.getActiveCases()) ?? undefined,
    ukDaily: (await predictiveMetricsClient.getDailyCases()) ?? undefined,
  };
});

export type TFetchLocalTrendlinePayload = {
  localTrendline: ITrendlineData;
};

export const fetchLocalTrendline = createAsyncThunk<Promise<Partial<TStateContent>>>(
  'content/fetch_local_trend_line',
  async (): Promise<Partial<TStateContent>> => {
    const { timeseries, ...trendline } = await contentService.getTrendlines();
    return {
      localTrendline: {
        delta: getTrendlineDelta(timeseries, 7),
        timeseries,
        ...trendline,
      },
    } as Partial<TStateContent>;
  },
);

export const fetchNewlySymptomaticData = createAsyncThunk('content/fetch_local_trend_line_omicron', async (): Promise<
  TNewlySymptomaticDataPoint[]
> => {
  return contentService.getNewlySymptomaticChartData();
});

export const fetchFeaturedContent = createAsyncThunk('content/featured_content', async (): Promise<
  Partial<TStateContent>
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

type TUpdateActiveNotificationAction = {
  notification: keyof TActiveNotifications;
  value: boolean;
};

export const updateTodayDate = createAction('content/update_today_date');
export const addDismissCallout = createAction<string>('content/dismissed_callout');
export const updateActiveNotification = createAction<TUpdateActiveNotificationAction>('content/active_notifications');
export const updateMenuNotificationsOnboardingSeen = createAction<boolean>(
  'content/menu_notifications_onboarding_seen',
);
export const updateShowProfileTabOnboarding = createAction<boolean>('content/show_profile_tab_onboarding');
export const updateShowStudyHubFeedback = createAction<boolean>('content/show_study_hub_feedback');
export const updateShowStudyHubInterestOnboarding = createAction<boolean>('content/show_study_hub_interest_onboarding');
export const updateShowStudyHubOnboarding = createAction<boolean>('content/show_study_hub_onboarding');
export const updateStudiesTabOnboardingSeen = createAction<boolean>('content/studies_tab_onboarding_seen');
export const updateShowStudyHubInterestFirstTimeModal = createAction<boolean>(
  'content/show_study_hub_interest_first_time_modal',
);
export const updateShowStudyHubVideoModal = createAction<boolean>('content/show_study_hub_video_modal');
export const updateShowBoosterModal = createAction<boolean>('content/show_booster_modal');
export const updateShowOmicronModal = createAction<boolean>('content/show_omicron_modal');
export const updateSelectedRegionItem = createAction<TRegionItem>('content/selected_region_item');
export const updateShowModal = createAction<TShowModal>('content/show_modal');

export const contentSlice = createSlice({
  extraReducers: {
    [updateSelectedRegionItem.type]: (current, action: PayloadAction<TRegionItem>) => {
      current.selectedRegionItem = action.payload;
    },
    [updateMenuNotificationsOnboardingSeen.type]: (current, action: PayloadAction<boolean>) => {
      if (current.startupInfo) {
        current.startupInfo.menu_notifications_onboarding_seen = action.payload;
      }
    },
    [updateShowBoosterModal.type]: (current, action: PayloadAction<boolean>) => {
      if (current.startupInfo) {
        current.startupInfo.show_booster_modal = action.payload;
      }
    },
    [updateShowModal.type]: (current, action: PayloadAction<TShowModal>) => {
      if (current.startupInfo) {
        current.startupInfo.show_modal = action.payload;
      }
    },
    [updateShowProfileTabOnboarding.type]: (state, action: PayloadAction<boolean>) => {
      if (state.startupInfo) {
        state.startupInfo.show_profile_tab_onboarding = action.payload;
      }
    },
    [updateShowStudyHubFeedback.type]: (state, action: PayloadAction<boolean>) => {
      if (state.startupInfo) {
        state.startupInfo.show_study_hub_feedback = action.payload;
      }
    },
    [updateShowStudyHubInterestOnboarding.type]: (state, action: PayloadAction<boolean>) => {
      if (state.startupInfo) {
        state.startupInfo.show_study_hub_interest_onboarding = action.payload;
      }
    },
    [updateShowStudyHubOnboarding.type]: (state, action: PayloadAction<boolean>) => {
      if (state.startupInfo) {
        state.startupInfo.show_study_hub_onboarding = action.payload;
      }
    },
    [updateShowStudyHubInterestFirstTimeModal.type]: (state, action: PayloadAction<boolean>) => {
      if (state.startupInfo) {
        state.startupInfo.show_study_hub_interest_first_time_modal = action.payload;
      }
    },
    [updateShowStudyHubVideoModal.type]: (state, action: PayloadAction<boolean>) => {
      if (state.startupInfo) {
        state.startupInfo.show_study_hub_video_modal = action.payload;
      }
    },
    [updateShowOmicronModal.type]: (current, action: PayloadAction<boolean>) => {
      if (current.startupInfo) {
        current.startupInfo.show_omicron_modal = action.payload;
      }
    },
    [updateActiveNotification.type]: (current, action: PayloadAction<TUpdateActiveNotificationAction>) => {
      if (current.startupInfo) {
        current.startupInfo.active_notifications = {
          ...current.startupInfo.active_notifications,
          [action.payload.notification]: action.payload.value,
        };
      }
    },
    [updateStudiesTabOnboardingSeen.type]: (state, action: PayloadAction<boolean>) => {
      if (state.startupInfo) {
        state.startupInfo.studies_tab_onboarding_seen = action.payload;
      }
    },
    [updateTodayDate.type]: (state) => {
      state.todayDate = todaysDate();
    },
    [addDismissCallout.type]: (state, action: PayloadAction<string>) => {
      if (!state.dismissedCallouts.includes(action.payload)) {
        state.dismissedCallouts = [...state.dismissedCallouts, action.payload];
        AsyncStorageService.setItem(JSON.stringify(state.dismissedCallouts), DISMISSED_CALLOUTS);
      }
    },
    // StartupInfo reducers
    [fetchStartupInfo.pending.type]: (state) => {
      state.infoApiState = 'loading';
    },
    [fetchStartupInfo.rejected.type]: (state) => {
      state.infoApiState = 'error';
    },
    [fetchStartupInfo.fulfilled.type]: (state, action: { payload: Partial<TStateContent> }) => {
      state.infoApiState = !action.payload ? 'error' : 'finished';
      state.startupInfo = action.payload.startupInfo;
      state.personalizedLocalData = action.payload.personalizedLocalData;
    },

    // DismissedCallouts reducer
    [fetchDismissedCallouts.fulfilled.type]: (state, action: { payload: Partial<TStateContent> }) => {
      state.dismissedCallouts = action.payload.dismissedCallouts ?? [];
    },

    // UK Predictive Metrics reducers
    [fetchUKMetrics.pending.type]: (state) => {
      state.ukMetricsApiState = 'loading';
    },
    [fetchUKMetrics.rejected.type]: (state) => {
      state.ukMetricsApiState = 'error';
    },
    [fetchUKMetrics.fulfilled.type]: (state, action: { payload: Partial<TStateContent> }) => {
      state.ukMetricsApiState = !action.payload ? 'error' : 'finished';
      const { ukActive, ukDaily } = action.payload;
      state.ukActive = ukActive;
      state.ukDaily = ukDaily;
    },

    // Featured content
    [fetchFeaturedContent.fulfilled.type]: (state, action: { payload: Partial<TStateContent> }) => {
      state.featuredHome = action.payload?.featuredHome ?? [];
      state.featuredThankyou = action.payload?.featuredThankyou ?? [];
    },

    // Trendline data
    [fetchLocalTrendline.fulfilled.type]: (current, action: { payload: Partial<TStateContent> }) => {
      current.localTrendline = action.payload?.localTrendline;
    },

    // Omicron newly symptomatic data
    [fetchNewlySymptomaticData.fulfilled.type]: (current, action: { payload: TNewlySymptomaticDataPoint[] }) => {
      current.newlySymptomaticChartData = action.payload;
    },
  },
  initialState: initialStateContent,
  name: 'content',
  reducers: {},
});

export const selectContent = (state: TRootState) => state.content;
