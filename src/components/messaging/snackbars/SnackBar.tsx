import React, { useState, useEffect } from 'react';
import { Animated, Easing, TouchableOpacity } from 'react-native';

import { TColorPalette, TColorShade } from '@covid/themes';

import { Text } from '../../typography';

import { SCardView, SContainerView, SMessageText, TVariant } from './styles';

// type StyleObject = { [key: string]: string | number };

type TCta = {
  action: () => void;
  label: string;
};

interface IProps {
  active: boolean;
  colorPalette?: TColorPalette;
  colorShade?: TColorShade;
  message: string;
  colorClass?: TColorPalette;
  variant?: TVariant;
  cta?: TCta;
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
  colorPalette = 'uiDark',
  colorShade = 'darker',
  message,
  cta = undefined,
  variant = 'bottom',
}: IProps) {
  const [animValue] = useState(new Animated.Value(0));

  const handleClose = () => {
    animate(false);
    setTimeout(cta?.action, DURATION);
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
        {cta && (
          <TouchableOpacity onPress={handleClose}>
            <Text colorPalette={colorPalette} colorShade={colorShade}>
              {cta.label}
            </Text>
          </TouchableOpacity>
        )}
      </SCardView>
    </SContainerView>
  );
}

export default Toast;
