//
// DTO / Responses
//
export interface ISchoolGroupModel {
  id: string;
  name: string;
}

export interface ISchoolModel {
  id: string;
  name: string;
  size: number;
  higher_education: boolean;
}

// Subscribed school stats

export interface ISubscribedSchoolGroupStats extends ISchoolGroupModel {
  status: string;
  cases: number;
  size: number;
  school: ISchoolModel;
  patient_id: string;
  max_size: number;
  daily_assessments: number;
  daily_reported_percentage: string;
  daily_reported_symptoms: number;
  confirmed_cases: number;
  recovered_cases: number;
  report_updated_at: Date;
}

export interface ISubscribedSchoolStats extends ISchoolModel {
  cases: number;
  groups: ISubscribedSchoolGroupStats[];
}

// School Join / Leave request

export interface ISchoolGroupSubscriptionDTO {
  patient_id: string;
}

export interface ISchoolGroupJoinedResponse {
  group: ISubscribedSchoolGroupStats;
}
