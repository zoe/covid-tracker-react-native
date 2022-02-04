import { patientService } from '@covid/core/patient/PatientService';
import { THealthProfileRequest, TPatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import { MAX_STEPS_FEMALE } from '@covid/features/health-profile/data/healthProfileNavigator';
import { THPScreenName } from '@covid/features/health-profile/data/healthProfileQuestions';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type THealthProfileScreenNames = THPScreenName | 'HPAboutYou' | 'HPThankYou';

export type TStateHealthProfile = {
  answers: {};
  dateOfLastUpdate: Date | null;
  hasSeenReminderModal: boolean;
  hasSeenAboutYouTooltip: boolean;
  maxSteps: number;
  progressPercent: number;
  screenToReturnTo: THealthProfileScreenNames;
  stepsCompleted: number;
};

type THealthProfileProgress = {
  dateOfLastUpdate: Date;
  maxSteps: number;
  progressPercent: number;
  screenToReturnTo: THealthProfileScreenNames;
  stepsCompleted: number;
};

type TExistingHealthProfileFields = keyof THealthProfileRequest;

export const initialStateHealthProfile: TStateHealthProfile = {
  answers: {},
  dateOfLastUpdate: null,
  hasSeenAboutYouTooltip: false,
  hasSeenReminderModal: false,
  maxSteps: MAX_STEPS_FEMALE,
  progressPercent: 0,
  screenToReturnTo: 'HPAboutYou',
  stepsCompleted: 0,
};

const EXISTING_HEALTH_PROFILE_FIELDS: TExistingHealthProfileFields[] = [
  'year_of_birth',
  'gender',
  'gender_identity',
  'weight_kg',
  'weight_pounds',
  'height_cm',
  'height_feet',
  'limited_activity',
  'postcode',
  'housebound_problems',
  'needs_help',
  'help_available',
  'mobility_aid',
  'healthcare_professional',
  'is_carer_for_community',
  // TODO: uncomment when we have the full JSON
  // 'has_kidney_disease',
  // 'has_cancer',
  // 'has_heart_disease',
];

export const fetchExistingHealthProfile = createAsyncThunk(
  'health_profile/fetch_health_profile',
  async (patientId: string): Promise<Partial<THealthProfileRequest>> => {
    const response = await patientService.getPatientDataById(patientId);
    const patientInfo = response?.patientInfo;

    if (!patientInfo) {
      return {};
    }

    const healthProfile: Partial<THealthProfileRequest> = Object.keys(patientInfo)
      .filter((key) => EXISTING_HEALTH_PROFILE_FIELDS.includes(key as TExistingHealthProfileFields))
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: patientInfo[key as keyof TPatientInfosRequest],
        };
      }, {});

    return { ...healthProfile };
  },
);

export const healthProfileSlice = createSlice({
  extraReducers(builder) {
    builder.addCase(fetchExistingHealthProfile.fulfilled, (state, action) => {
      state.answers = action.payload;
    });
  },
  initialState: initialStateHealthProfile,
  name: 'HealthProfile',
  reducers: {
    resetHealthProfile: () => {
      return initialStateHealthProfile;
    },
    updateHasSeenAboutYouTooltip: (state, action: PayloadAction<boolean>) => ({
      ...state,
      hasSeenAboutYouTooltip: action.payload,
    }),
    updateHasSeenHealthProfileReminderModal: (state, action: PayloadAction<boolean>) => ({
      ...state,
      hasSeenReminderModal: action.payload,
    }),
    updateHealthProfile: (state, action: PayloadAction<Partial<THealthProfileRequest>>) => ({
      ...state,
      answers: {
        ...state.answers,
        ...action.payload,
      },
    }),
    updateHealthProfileProgress: (state, action: PayloadAction<THealthProfileProgress>) => ({
      ...state,
      dateOfLastUpdate: action.payload.dateOfLastUpdate,
      maxSteps: action.payload.maxSteps,
      progressPercent: action.payload.progressPercent,
      screenToReturnTo: action.payload.screenToReturnTo,
      stepsCompleted: action.payload.stepsCompleted,
    }),
  },
});

export const {
  resetHealthProfile,
  updateHasSeenAboutYouTooltip,
  updateHasSeenHealthProfileReminderModal,
  updateHealthProfile,
  updateHealthProfileProgress,
} = healthProfileSlice.actions;
