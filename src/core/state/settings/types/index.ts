export type TFeature = 'MENTAL_HEALTH_STUDY' | 'UK_DIET_STUDY';

export interface ISettings {
  currentFeature: TFeature | undefined;
  featureRunDate: Date | undefined;
  hasEmailSubscription: boolean;
}
