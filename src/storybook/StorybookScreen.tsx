import { ScreenParamList } from '@covid/features/ScreenParamList';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';

import StorybookUIRoot from './index';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'CountrySelect'>;
  route: RouteProp<ScreenParamList, 'CountrySelect'>;
};

export class StorybookScreen extends React.Component<Props, object> {
  public render() {
    return <StorybookUIRoot />;
  }
}
