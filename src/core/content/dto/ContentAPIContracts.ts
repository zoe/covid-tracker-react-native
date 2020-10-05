export type TrendLineRepsonse = {
  lad: string;
  name: string;
  delta: number;
  today: number;
  timeseries: ITrendLineTimeseriesData[];
};

export type LADSearchResult = {
  name: number;
  lad: number;
}

export type LADSearchResponse = {
  page: number;
  size: number;
  results: LADSearchResult[];
}

export interface ITrendlineData {
  name?: string;
  delta?: number;
  today?: number;
  timeseries?: ITrendLineTimeseriesData[];
}

export interface ITrendLineTimeseriesData {
  LAD: string;
  value: number;
  lower_CI: number;
  upper_CI: number;
  date: Date;
}
