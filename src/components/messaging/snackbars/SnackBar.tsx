import React, { useState, useEffect } from 'react';
import { Animated, Easing, View } from 'react-native';

import { TColorPalette, TColorShade } from '@covid/themes';
import { IUIAction, IUIMessage, useMessage } from '@covid/common';

import { RoundIconButton, ThemeButton } from '../../Buttons';
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
  const { removeMessage } = useMessage();

  const config = {
    bottom: { start: 200, end: -16 },
    top: { start: -200, end: 16 },
  };

  const handleClose = () => {
    removeMessage();
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
    let isMouted = true;
    if (isMouted) {
      animate(active);
    }
    return function () {
      isMouted = false;
    };
  }, [active, animValue]);

  const animateTo = animValue.interpolate({
    inputRange: [RANGE_FROM, RANGE_TO],
    outputRange: [config[variant].start, config[variant].end],
  });

  return (
    <SContainerView variant={variant} style={{ transform: [{ translateY: animateTo }] }}>
      <SCardView colorPalette={colorPalette} colorShade={colorShade}>
        <View style={{ flex: 1 }}>
          {message.message.title && (
            <Text textClass="h5Medium" style={{ color: 'white' }}>
              {message.message.title}
            </Text>
          )}
          <SMessageText colorPalette={colorPalette} colorShade={colorShade} textClass="pSmall">
            {message.message.body}
          </SMessageText>
        </View>
        {action && <ThemeButton onPress={action.action} title={action.label} colorPalette="teal" colorShade="main" />}
        <RoundIconButton onPress={handleClose} iconName="close-large" iconColor="white" />
      </SCardView>
    </SContainerView>
  );
}

export default Snackbar;
