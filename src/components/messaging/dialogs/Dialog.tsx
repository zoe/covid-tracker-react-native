import React from 'react';
import { Button, Dimensions, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { IUIMessage, reset } from '@covid/core/ui-messaging';
import { useTheme } from '@covid/themes';

// import { ThemeButton } from '../../Buttons';
import { Text } from '../../typography';

import { SContainerView, SMessageWindowView, STitleView } from './styles';

interface IProps {
  message: IUIMessage;
}

function Dialog({ message }: IProps) {
  const { height, width } = Dimensions.get('window');
  const theme = useTheme();
  const dispatch = useDispatch();
  return (
    <SContainerView height={height} width={width}>
      <SMessageWindowView>
        <STitleView>
          <Text textClass="h4Medium" rhythm={theme.grid.l}>
            {message.message.title}
          </Text>
          <Text rhythm={theme.grid.xxxl}>{message.message.body}</Text>
        </STitleView>
        <View>
          {/* <ThemeButton onPress={() => null} title="Action 1" colorPalette="blue" colorShade="main" /> */}
          <Button title="Close" onPress={() => dispatch(reset())} />
        </View>
      </SMessageWindowView>
    </SContainerView>
  );
}

export default Dialog;
