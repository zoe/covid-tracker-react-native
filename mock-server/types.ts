export interface Patient {
  id: string;
  last_reported_at: string;
}

export interface Assessment {
  id: string;
  patient: string;
  profile_attributes_updated_at: string;
}
