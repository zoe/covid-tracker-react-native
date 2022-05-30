import { TScreenParamList } from '@covid/routes/types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export interface AssessmentFlowPage2ScreenProps {
  navigation: StackNavigationProp<TScreenParamList, 'AssessmentPage2UpdateUsualSelf'>;
  route: RouteProp<TScreenParamList, 'AssessmentPage2UpdateUsualSelf'>;
}
