//
// DTO / Responses
//
export interface SchoolGroupModel {
  id: string;
  name: string;
}

export interface SchoolModel {
  id: string;
  name: string;
  size: number;
  higher_education: boolean;
}

// Subscribed school stats

export interface SubscribedSchoolGroupStats extends SchoolGroupModel {
  status: string;
  cases: number;
  size: number;
  school: SchoolModel;
  patient_id: string;
  max_size: number;
  daily_assessments: number;
  daily_reported_percentage: string;
  daily_reported_symptoms: number;
  confirmed_cases: number;
  recovered_cases: number;
  report_updated_at: Date;
}

export interface SubscribedSchoolStats extends SchoolModel {
  cases: number;
  groups: SubscribedSchoolGroupStats[];
}

// School Join / Leave request

export interface SchoolGroupSubscriptionDTO {
  patient_id: string;
}

export interface SchoolGroupJoinedResponse {
  group: SubscribedSchoolGroupStats;
}
