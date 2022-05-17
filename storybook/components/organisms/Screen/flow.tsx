import Screen from '@tracer/components/atoms/Screen';
import React, { RefObject } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

type TFlowType = 'horizontal' | 'vertical';

interface IScreenFlowProps {
  children?: any;
  /**
   * Controls in which direction the Screen should scroll
   */
  flow?: TFlowType;
  /**
   * Controls how often the scroll event will be fired while scrolling (as a time interval in ms)
   */
  scrollEventThrottle?: number;
  scrollRef?: RefObject<ScrollView> | undefined;
  height?: number;
  width?: number;
  props?: any;
}

export default function ScreenFlow({
  children,
  flow = 'horizontal',
  scrollEventThrottle = 0,
  scrollRef,
  height,
  width,
  props,
}: IScreenFlowProps) {
  const isHorizontalFlow = flow === 'horizontal';
  return (
    <Screen>
      <ScrollView
        pagingEnabled
        horizontal={isHorizontalFlow}
        ref={scrollRef}
        scrollEventThrottle={scrollEventThrottle}
        style={[baseStyle.flex, { height, width }]}
        {...props}
      >
        {children}
      </ScrollView>
    </Screen>
  );
}

const baseStyle = StyleSheet.create({
  flex: { flex: 1 },
});
