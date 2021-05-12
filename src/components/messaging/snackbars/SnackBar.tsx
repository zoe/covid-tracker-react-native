import { IUIAction, IUIMessage, useMessage } from '@covid/common';
import { TColorPalette, TColorShade } from '@covid/themes';
import React, { useEffect, useState } from 'react';
import { Animated, Easing, View } from 'react-native';

import { RoundIconButton, ThemeButton } from '../../buttons';
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
    bottom: { end: -16, start: 200 },
    top: { end: 16, start: -200 },
  };

  const handleClose = () => {
    removeMessage();
  };

  const animate = (active: boolean, cb?: () => void) => {
    Animated.timing(animValue, {
      duration: DURATION,
      easing: Easing.elastic(1),
      toValue: active ? RANGE_TO : RANGE_FROM,
      useNativeDriver: true,
    }).start(cb);
  };

  useEffect(() => {
    let isMouted = true;
    if (isMouted) {
      animate(active);
    }
    return () => {
      isMouted = false;
    };
  }, [active, animValue]);

  const animateTo = animValue.interpolate({
    inputRange: [RANGE_FROM, RANGE_TO],
    outputRange: [config[variant].start, config[variant].end],
  });

  return (
    <SContainerView style={{ transform: [{ translateY: animateTo }] }} variant={variant}>
      <SCardView colorPalette={colorPalette} colorShade={colorShade}>
        <View style={{ flex: 1 }}>
          {message.message.title ? (
            <Text style={{ color: 'white' }} textClass="h5Medium">
              {message.message.title}
            </Text>
          ) : null}
          <SMessageText colorPalette={colorPalette} colorShade={colorShade} textClass="pSmall">
            {message.message.body}
          </SMessageText>
        </View>
        {action ? (
          <ThemeButton colorPalette="teal" colorShade="main" onPress={action.action} title={action.label} />
        ) : null}
        <RoundIconButton iconColor="white" iconName="close-large" onPress={handleClose} />
      </SCardView>
    </SContainerView>
  );
}

export default Snackbar;
