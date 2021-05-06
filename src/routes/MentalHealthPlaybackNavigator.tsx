import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { MentalHealthPlayback, ScreenParamList } from '@covid/features';

const StackType = createStackNavigator<ScreenParamList>();

interface IProps {
  Stack: typeof StackType;
}

const noHeader = {
  headerShown: false,
};

export default function MentalHealthPlaybackNavigator({ Stack }: IProps) {
  return (
    <>
      <Stack.Screen name="MentalHealthPlayback" component={MentalHealthPlayback} options={noHeader} />
    </>
  );
}
