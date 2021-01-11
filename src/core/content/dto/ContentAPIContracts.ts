export type TrendLineResponse = {
  lad: string;
  name: string;
  today: number;
  timeseries: ITrendLineTimeSeriesData[];
};

export type LADSearchResult = {
  name: string;
  lad: string;
};

export type LADSearchResponse = {
  page: number;
  size: number;
  results: LADSearchResult[];
};

export interface ITrendLineData {
  lad?: string;
  name?: string;
  delta?: number;
  today?: number;
  timeseries?: ITrendLineTimeSeriesData[];
}

export interface ITrendLineTimeSeriesData {
  LAD: string;
  value: number;
  lower_CI: number;
  upper_CI: number;
  date: Date;
}

/**
 * Featured Content
 */
export interface IFeaturedContent {
  name: string;
  slug: string;
  thumbnail_image_url: string;
  thumbnail_aspect_ratio: number;
  link: string;
  order_index: number;
  featured_uk_home: boolean;
  featured_uk_thankyou: boolean;
  updated_at: Date;
  published_at: Date;
}

export type FeaturedContentResponse = IFeaturedContent[];
