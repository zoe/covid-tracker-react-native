import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, Easing } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IUIMessage, useMessage } from '@covid/common';

import { ThemeButton } from '../../Buttons';
import { Text } from '../../typography';

import { SButtonRowView, SContainerView } from './styles';

interface IProps {
  active?: boolean;
  message: IUIMessage;
}

const DURATION = 300;
const RANGE_FROM = 0;
const RANGE_TO = 1;

function Banner({ active = true, message }: IProps) {
  const [animValue] = useState(new Animated.Value(0));
  const { width } = Dimensions.get('window');
  const { top } = useSafeAreaInsets();
  const { removeMessage } = useMessage();

  const handleClose = () => {
    removeMessage();
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
    let isMounted = true;
    if (isMounted) {
      animate(active);
    }
    return function cleanUp() {
      isMounted = false;
    };
  }, [active, animValue]);

  const animateTo = animValue.interpolate({
    inputRange: [RANGE_FROM, RANGE_TO],
    outputRange: [-300, 0],
  });

  return (
    <SContainerView top={top} width={width} style={{ transform: [{ translateY: animateTo }] }}>
      {message.message.title && <Text textClass="h5Medium">{message.message.title}</Text>}
      <Text>{message.message.body}</Text>
      <SButtonRowView>
        {message.actions
          ? message.actions.map((action, index) => {
              const key = `banner-action-${index}`;
              return (
                <ThemeButton
                  key={key}
                  onPress={action.action}
                  title={action.label}
                  colorPalette="teal"
                  colorShade="main"
                  simple
                />
              );
            })
          : null}
      </SButtonRowView>
    </SContainerView>
  );
}

export default Banner;
