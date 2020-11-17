import React, { useState, useEffect } from 'react';
import { Animated, Dimensions, Easing, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

import { TColorPalette, TColorShade } from '@covid/themes';
import { IUIAction, IUIMessage, reset } from '@covid/core/ui-messaging';

import { Text } from '../../typography';

import { SCardView, SContainerView, SMessageText, TVariant } from './styles';

interface IProps {
  action?: IUIAction;
  active: boolean;
  colorPalette?: TColorPalette;
  colorShade?: TColorShade;
  message: IUIMessage;
  variant?: TVariant;
}

const DURATION = 300;
const RANGE_FROM = 0;
const RANGE_TO = 1;

function Snackbar({
  action = undefined,
  active,
  colorPalette = 'blue',
  colorShade = 'main',
  message,
  variant = 'bottom',
}: IProps) {
  const [animValue] = useState(new Animated.Value(0));
  const dispatch = useDispatch();
  const { height } = Dimensions.get('window');

  const config = {
    bottom: { start: 200, end: -16 },
    top: { start: -200, end: 16 },
  };

  const handleClose = () => {
    dispatch(reset());
  };

  const animate = (active: boolean, cb?: () => void) => {
    Animated.timing(animValue, {
      toValue: active ? RANGE_TO : RANGE_FROM,
      duration: DURATION,
      easing: Easing.elastic(1),
      useNativeDriver: true,
    }).start(cb);
  };

  useEffect(() => {
    animate(active);
  }, [active, animValue]);

  const animateTo = animValue.interpolate({
    inputRange: [RANGE_FROM, RANGE_TO],
    outputRange: [config[variant].start, config[variant].end],
  });

  return (
    <SContainerView variant={variant} style={{ transform: [{ translateY: animateTo }] }}>
      <SCardView colorPalette={colorPalette} colorShade={colorShade}>
        <SMessageText colorPalette={colorPalette} colorShade={colorShade}>
          {message.message.body}
        </SMessageText>
        <TouchableOpacity onPress={handleClose}>
          <Text colorPalette={colorPalette} colorShade={colorShade}>
            close
          </Text>
        </TouchableOpacity>
      </SCardView>
    </SContainerView>
  );
}

export default Snackbar;
