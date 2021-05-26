import { IUIMessage, useMessage } from '@covid/common';
import { RoundIconButton, ThemeButton } from '@covid/components/buttons';
import { Text } from '@covid/components/typography';
import { useTheme } from '@covid/themes';
import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, Easing, View } from 'react-native';

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
  const { removeMessage } = useMessage();

  const getActions = () => {
    if (message.actions) {
      return message.actions.map((action, index) => {
        const key = `dialog-action-${index}`;
        if (index % 2) {
          return (
            <ThemeButton
              simple
              colorPalette="burgundy"
              colorShade="main"
              key={key}
              onPress={action.action}
              title={action.label}
            />
          );
        }
        return (
          <ThemeButton colorPalette="teal" colorShade="main" key={key} onPress={action.action} title={action.label} />
        );
      });
    }
    return null;
  };

  const animate = (active: boolean) => {
    Animated.timing(animValue, {
      duration: DURATION,
      easing: Easing.elastic(1),
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
    outputRange: [40, 0],
  });

  return (
    <SContainerView height={height} width={width}>
      <SMessageWindowView style={{ transform: [{ translateY: animateTo }] }}>
        <STitleView>
          <Text rhythm={theme.grid.l} textClass="h4Medium">
            {message.message.title}
          </Text>
          <Text rhythm={theme.grid.xxxl}>{message.message.body}</Text>
        </STitleView>
        <View>{getActions()}</View>
        <RoundIconButton
          iconName="close-large"
          onPress={removeMessage}
          style={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        />
      </SMessageWindowView>
    </SContainerView>
  );
}

export default Dialog;
