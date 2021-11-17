import { withAnalytics } from '@covid/components/analytics/withAnalytics';
import { TouchableWithoutFeedback, TouchableWithoutFeedbackProps } from 'react-native';

export const TouchableWithoutFeedbackAnalytics = withAnalytics<TouchableWithoutFeedbackProps>(TouchableWithoutFeedback);
