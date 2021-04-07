import React from 'react';
import { View } from 'react-native';

import { Text } from '@covid/components';

interface IProps {
  screenName?: string;
}

function Screen({ screenName = 'screen name' }: IProps) {
  return (
    <View>
      <Text>{`${screenName} : ${Math.round(Math.random() * 10)}`}</Text>
    </View>
  );
}

export default Screen;
