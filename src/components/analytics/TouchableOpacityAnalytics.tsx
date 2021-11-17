import { withAnalytics } from '@covid/components/analytics/withAnalytics';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

export const TouchableOpacityAnalytics = withAnalytics<TouchableOpacityProps>(TouchableOpacity);
