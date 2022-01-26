import { patientService } from '@covid/core/patient/PatientService';
import { THealthProfileData, TStateHealthProfile } from '@covid/core/state/health-profile/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const initialStateHealthProfile: TStateHealthProfile = {
  answers: {},
};

export const fetchExistingHealthProfile = createAsyncThunk(
  'health_profile/fetch_health_profile',
  async (patientId: string): Promise<THealthProfileData> => {
    const response = await patientService.getPatientDataById(patientId); // TODO: This should be changed to health profile specific endpoint
    const patientInfo = response?.patientInfo;

    const healthProfileFields = [
      'year_of_birth',
      'height_cm',
      'height_feet',
      'weight_kg',
      'weight_pounds',
      'gender',
      'gender_identity',
      'postcode',
      'has_cancer',
    ];

    const healthProfile: THealthProfileData = Object.keys(patientInfo)
      .filter((key) => healthProfileFields.includes(key))
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: patientInfo[key],
        };
      }, {});

    // TODO: remove pcos_1 - this is just for testing purposes for YesNo field
    return { ...healthProfile, pcos_1: true };
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
  reducers: {},
});
