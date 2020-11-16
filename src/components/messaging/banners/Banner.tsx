import React from 'react';
import { Button, Dimensions, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { IUIMessage, reset } from '@covid/core/ui-messaging';

import { Text } from '../../typography';

import { SContainerView } from './styles';

interface IProps {
  message: IUIMessage;
}

function Banner({ message }: IProps) {
  const dispatch = useDispatch();
  const { width } = Dimensions.get('window');

  return (
    <SContainerView width={width}>
      <Text>{message.message.body}</Text>
      <View>
        <Button title="Close" onPress={() => dispatch(reset())} />
      </View>
    </SContainerView>
  );
}

export default Banner;
