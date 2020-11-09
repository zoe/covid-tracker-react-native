import React, { useState, useEffect } from 'react';
import { Animated, Easing, TouchableOpacity, Text } from 'react-native';

import { TColorPalette, TColorShade } from '@covid/themes';

import { ThemeButton } from '../../Buttons';

// import Icon from '../icon';

import {
  // SActionText,
  SCardView,
  SContainerView,
  SMessageText,
  // STouchableOpactity,
  TVariant,
} from './styles';

type StyleObject = { [key: string]: string | number };

interface IButtonProps {
  title: string;
  onPress: () => void;
  buttonColorPalette: TColorPalette;
  buttonColorShade: TColorShade;
}

interface IProps {
  active: boolean;
  button?: IButtonProps;
  colorPalette?: TColorPalette;
  colorShade?: TColorShade;
  iconName: string;
  message: string;
  colorClass?: TColorPalette;
  variant?: TVariant;
  onClose?: () => void;
}

const DURATION = 500;
const RANGE_FROM = 0;
const RANGE_TO = 1;
const START_Y_BOTTOM = 200;
const END_Y_BOTTOM = -16;
const START_Y_TOP = -200;
const END_Y_TOP = 16;

const config = {
  bottom: { start: START_Y_BOTTOM, end: END_Y_BOTTOM },
  top: { start: START_Y_TOP, end: END_Y_TOP },
};

function Toast({
  active,
  button,
  colorPalette = 'uiDark',
  colorShade = 'darker',
  message,
  iconName,
  onClose,
  variant = 'bottom',
}: IProps) {
  const [animValue] = useState(new Animated.Value(0));

  const handleClose = () => {
    animate(false);
    setTimeout(onClose, DURATION);
  };

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
    outputRange: [config[variant].start, config[variant].end],
  });

  return (
    <SContainerView variant={variant} style={{ transform: [{ translateY: animateTo }] }}>
      <SCardView colorPalette={colorPalette} colorShade={colorShade}>
        <SMessageText colorPalette={colorPalette} colorShade={colorShade}>
          {message}
        </SMessageText>

        {button && (
          <ThemeButton
            colorPalette={button.buttonColorPalette}
            colorShade={button.buttonColorShade}
            onPress={button.onPress}
            title={button.title}
          />
        )}
        {onClose && (
          <TouchableOpacity onPress={handleClose}>
            <Text style={{ color: 'white' }}> X </Text>
          </TouchableOpacity>
        )}
      </SCardView>
    </SContainerView>
  );
}

export default Toast;
