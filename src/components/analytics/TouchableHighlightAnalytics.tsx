import { withAnalytics } from '@covid/components/analytics/withAnalytics';
import { TouchableHighlight, TouchableHighlightProps } from 'react-native';

// Has a typescript error because the TouchableHighlight component doesn't support the 'disabled' property.
// @ts-expect-error
export const TouchableHighlightAnalytics = withAnalytics<TouchableHighlightProps>(TouchableHighlight);
