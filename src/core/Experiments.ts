import Analytics from '@covid/core/Analytics';
import { container } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';
import { IUserService } from '@covid/core/user/UserService';

export const experiments = {
  Experiment_001: 'Experiment_001', // Test alternative external callouts on UK Thank You Pags
  Trend_Line_Launch: 'Trend_Line_Launch',
};

export enum Cohorts {
  PersonalizedMap = 'Personalized map',
  TrendLine = 'Trend line',
}

export enum PersonalizedMapCohort {
  WithLAD = 'With LAD',
  MissingLAD = 'Missing LAD',
}

export enum TrendLineCohort {
  WithTrendLine = 'With trend line',
  MissingTrendline = 'Missing trend line',
}

function hashToInt(s: string): number {
  // Implementation of a quick and evenly spread hash to an integer:
  // https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
  let hash = 0,
    i,
    chr;
  for (i = 0; i < s.length; i++) {
    chr = s.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

function getVariant(hash: string, totalVariants: number): string {
  const variantNumber = (hashToInt(hash) % totalVariants) + 1;
  return 'variant_' + variantNumber;
}

export async function startExperiment(experimentName: string, totalVariants: number): Promise<string | null> {
  const profile = await container.get<IUserService>(Services.User).getUser();
  if (!profile) return null;

  const variant = getVariant(profile.username, totalVariants);
  const payload: { [index: string]: string } = {};
  payload[experimentName] = variant;
  Analytics.identify(payload);
  return variant;
}

export async function assignCohort(cohort: string, group: string) {
  const profile = await container.get<IUserService>(Services.User).getUser();
  if (!profile || !cohort || !group) return null;

  const payload: { [index: string]: string } = {};
  payload[cohort] = group;
  Analytics.identify(payload);
}
