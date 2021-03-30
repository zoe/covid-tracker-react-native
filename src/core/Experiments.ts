import Analytics from '@covid/core/Analytics';
import store from '@covid/core/state/store';

export const experiments = {
  Experiment_001: 'Experiment_001', // Test 4 alternative external callouts on UK ThankYou screem
  Trend_Line_Launch: 'Trend_Line_Launch', // Rollout Trendlines to only 50% of users to see effect on dashboard
  UK_DietScore_Invite: 'UK_DietScore_Invite', // Test invites on Dashboard vs ThankYou screen
  UK_DIET_SCORE: 'UK_DIET_SCORE', // Test two different DietScore play flows between 2021-03-01 & 2021-03-05
};

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

export function startExperiment(experimentName: string, totalVariants: number): string | null {
  const user = store.getState().user;
  if (!user) return null;

  const variant = getVariant(user.username, totalVariants);
  const payload: { [index: string]: string } = {};
  payload[experimentName] = variant;
  Analytics.identify(payload);
  return variant;
}
