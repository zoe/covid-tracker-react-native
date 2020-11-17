import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, Easing, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { IUIMessage, reset } from '@covid/core/ui-messaging';
import { useTheme } from '@covid/themes';

import { ThemeButton } from '../../Buttons';
import { Text } from '../../typography';

import { SContainerView, SMessageWindowView, STitleView } from './styles';

interface IProps {
  active: boolean;
  message: IUIMessage;
}

const DURATION = 500;
const RANGE_FROM = 0;
const RANGE_TO = 1;

function Dialog({ active, message }: IProps) {
  const [animValue] = useState(new Animated.Value(0));
  const { height, width } = Dimensions.get('window');
  const theme = useTheme();
  const dispatch = useDispatch();

  const animate = (active: boolean) => {
    Animated.timing(animValue, {
      toValue: active ? RANGE_TO : RANGE_FROM,
      duration: DURATION,
      easing: Easing.elastic(1),
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animate(active);
  }, [active, animValue]);

  const animateTo = animValue.interpolate({
    inputRange: [RANGE_FROM, RANGE_TO],
    outputRange: [40, 0],
  });

  return (
    <SContainerView height={height} width={width}>
      <SMessageWindowView style={{ transform: [{ translateY: animateTo }] }}>
        <STitleView>
          <Text textClass="h4Medium" rhythm={theme.grid.l}>
            {message.message.title}
          </Text>
          <Text rhythm={theme.grid.xxxl}>{message.message.body}</Text>
        </STitleView>
        <View>
          <ThemeButton onPress={() => dispatch(reset())} title="Action 1" colorPalette="teal" colorShade="main" />
          <ThemeButton
            onPress={() => dispatch(reset())}
            title="Action 1"
            colorPalette="burgundy"
            colorShade="main"
            simple
          />
        </View>
      </SMessageWindowView>
    </SContainerView>
  );
}

export default Dialog;
