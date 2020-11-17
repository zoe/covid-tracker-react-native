import React, { useEffect, useState } from 'react';
import { Animated, Button, Dimensions, Easing } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IUIMessage, reset } from '@covid/core/ui-messaging';

import { ThemeButton } from '../../Buttons';
import { Text } from '../../typography';

import { SContainerView, SButtonRowView } from './styles';

interface IProps {
  active?: boolean;
  message: IUIMessage;
}

const DURATION = 300;
const RANGE_FROM = 0;
const RANGE_TO = 1;

function Banner({ active = true, message }: IProps) {
  const [animValue] = useState(new Animated.Value(0));
  const dispatch = useDispatch();
  const { width } = Dimensions.get('window');
  const { top } = useSafeAreaInsets();

  const handleClose = () => {
    dispatch(reset());
  };

  const animate = (active: boolean) => {
    Animated.timing(animValue, {
      toValue: active ? RANGE_TO : RANGE_FROM,
      duration: DURATION,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animate(active);
  }, [active, animValue]);

  const animateTo = animValue.interpolate({
    inputRange: [RANGE_FROM, RANGE_TO],
    outputRange: [-300, 0],
  });

  return (
    <SContainerView top={top} width={width} style={{ transform: [{ translateY: animateTo }] }}>
      <Text>{message.message.body}</Text>
      <SButtonRowView>
        <ThemeButton onPress={handleClose} title="Action 1" colorPalette="teal" colorShade="main" simple />
        <ThemeButton onPress={handleClose} title="Action 1" colorPalette="teal" colorShade="main" simple />
      </SButtonRowView>
    </SContainerView>
  );
}

export default Banner;
