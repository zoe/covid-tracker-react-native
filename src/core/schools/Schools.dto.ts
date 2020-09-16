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
}

// Subscribed school stats

interface Membership {
  patientId: string;
}

export interface SubscribedSchoolGroupStats extends SchoolGroupModel {
  status: string;
  cases: number;
  size: number;
  school: SchoolModel;
  membership: Membership[];
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
