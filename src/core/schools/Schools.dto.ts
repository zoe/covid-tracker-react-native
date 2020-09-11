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
  size?: number | null;
}

// Subscribed school stats

export interface SubscribedSchoolGroupStats extends SchoolGroupModel {
  status: string;
  cases?: number | null;
  size?: number | null;
  school?: SchoolModel;
}

export interface SubscribedSchoolStats extends SchoolModel {
  cases?: number;
  size?: number | null;
  groups: SubscribedSchoolGroupStats[];
}

// School Join / Leave request

export interface SchoolGroupSubscriptionDTO {
  patient_id: string;
}

export interface SchoolGroupJoinedResponse {
  group: SubscribedSchoolGroupStats;
}

// School network subscriptions Responses

export interface SchoolGroupSubscriptionModel extends SchoolGroupModel {
  status: string;
  size?: number | null;
  school: SchoolModel;
}

export type SchoolGroupSubscriptionResponse = SchoolGroupSubscriptionModel[];
