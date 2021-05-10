import { IUIMessage, useMessage } from '@covid/common';
import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, Easing } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemeButton } from '../../buttons';
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
      duration: DURATION,
      easing: Easing.linear,
      toValue: active ? RANGE_TO : RANGE_FROM,
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
    <SContainerView style={{ transform: [{ translateY: animateTo }] }} top={top} width={width}>
      {message.message.title && <Text textClass="h5Medium">{message.message.title}</Text>}
      <Text>{message.message.body}</Text>
      <SButtonRowView>
        {message.actions
          ? message.actions.map((action, index) => {
              const key = `banner-action-${index}`;
              return (
                <ThemeButton
                  simple
                  colorPalette="teal"
                  colorShade="main"
                  key={key}
                  onPress={action.action}
                  title={action.label}
                />
              );
            })
          : null}
      </SButtonRowView>
    </SContainerView>
  );
}

export default Banner;
