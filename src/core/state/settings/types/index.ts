export type TFeature = 'MENTAL_HEALTH_STUDY' | 'UK_DIET_STUDY' | 'TIMELINE';

export interface ISettings {
  currentFeature: TFeature | undefined;
  featureRunDate: string | undefined;
  hasEmailSubscription: boolean;
}
