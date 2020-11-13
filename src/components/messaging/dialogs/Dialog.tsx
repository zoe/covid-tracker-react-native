import React from 'react';
import { Button, Dimensions, Text, View } from 'react-native';

import { IUIMessage } from '@covid/core/ui-messaging';

import { SContainerView, SMessageWindowView } from './styles';

interface IProps {
  message: IUIMessage;
}

function Dialog({ message }: IProps) {
  const { height, width } = Dimensions.get('window');
  return (
    <SContainerView height={height} width={width}>
      <SMessageWindowView>
        <Text>Title</Text>
        <Text>{message.message}</Text>
        <View>
          <Button title="Action 1" onPress={() => null} />
          <Button title="Action 2" onPress={() => null} />
        </View>
      </SMessageWindowView>
    </SContainerView>
  );
}

export default Dialog;
