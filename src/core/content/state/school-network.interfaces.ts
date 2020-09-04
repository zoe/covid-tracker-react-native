export interface SchoolNetworkData {
  id: string;
  name: string;
  cases: number;
  groups: SchoolNetworkGroupData[];
}

export interface SchoolNetworkGroupData {
  id: string;
  name: string;
  cases?: number | null;
}
