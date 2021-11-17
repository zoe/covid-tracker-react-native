import { withAnalytics } from '@covid/components/analytics/withAnalytics';
import BrandedButton, { IBrandedButtonProps } from '@covid/components/buttons/branded-button';

export const BrandedButtonAnalytics = withAnalytics<IBrandedButtonProps>(BrandedButton);
