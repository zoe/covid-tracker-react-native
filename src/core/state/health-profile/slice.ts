import { patientService } from '@covid/core/patient/PatientService';
import { THealthProfileData, TStateHealthProfile } from '@covid/core/state/health-profile/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialStateHealthProfile: TStateHealthProfile = {
  answers: {},
};

const EXISTING_HEALTH_PROFILE_FIELDS = [
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
  'has_kidney_disease',
  'has_cancer',
  'has_heart_disease',
];

export const fetchExistingHealthProfile = createAsyncThunk(
  'health_profile/fetch_health_profile',
  async (patientId: string): Promise<THealthProfileData> => {
    const response = await patientService.getPatientDataById(patientId);
    const patientInfo = response?.patientInfo;

    if (!patientInfo) {
      return {};
    }

    const healthProfile: THealthProfileData = Object.keys(patientInfo)
      .filter((key) => EXISTING_HEALTH_PROFILE_FIELDS.includes(key))
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: patientInfo[key],
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
    // TODO: Delete once we finish testing implementation
    resetHealthProfile: (state) => {
      state.answers = {};
    },
    updateHealthProfile: (state, action: PayloadAction<THealthProfileData>) => ({
      ...state,
      answers: {
        ...state.answers,
        ...action.payload,
      },
    }),
  },
});

export const { updateHealthProfile, resetHealthProfile } = healthProfileSlice.actions;
