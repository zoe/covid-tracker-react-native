import {
  HealthCareStaffOptions,
  EquipmentUsageOptions,
  AvailabilityAlwaysOptions,
  AvailabilitySometimesOptions,
  AvailabilityNeverOptions,
  PatientInteractions,
} from '@covid/core/user/dto/UserAPIContracts';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { ScreenParamList } from '../../ScreenParamList';

export interface IOption {
  label: string;
  value: string | number;
}

export interface YourWorkData {
  isHealthcareStaff: HealthCareStaffOptions;
  isCarer: 'yes' | 'no';
  hasPatientInteraction: PatientInteractions;
  hasUsedPPEEquipment: EquipmentUsageOptions;
  ppeAvailabilityAlways: AvailabilityAlwaysOptions;
  ppeAvailabilitySometimes: AvailabilitySometimesOptions;
  ppeAvailabilityNever: AvailabilityNeverOptions;
}

export type YourWorkProps = {
  navigation: StackNavigationProp<ScreenParamList, 'AboutYou'>;
  route: RouteProp<ScreenParamList, 'AboutYou'>;
};

export type State = {
  isDiabetesRegistry: boolean;
  atHospitalInpatient: boolean;
  atHospitalOutpatient: boolean;
  atClinicOutsideHospital: boolean;
  atCareFacility: boolean;
  atHomeHealth: boolean;
  atSchoolClinic: boolean;
  atOtherFacility: boolean;

  errorMessage: string;
};

export const initialState: State = {
  isDiabetesRegistry: false,
  atHospitalInpatient: false,
  atHospitalOutpatient: false,
  atClinicOutsideHospital: false,
  atCareFacility: false,
  atHomeHealth: false,
  atSchoolClinic: false,
  atOtherFacility: false,

  errorMessage: '',
};
