import React from 'react';
import { Platform, ScrollView as RNScrollView, ScrollViewProps, useWindowDimensions, View } from 'react-native';

export type TProps = ScrollViewProps & {
  bottomBackgroundColor?: string;
  topBackgroundColor?: string;
};

export function ScrollView(props: TProps) {
  const windowDimensions = useWindowDimensions();
  const spacerHeight = windowDimensions.height / 2;

  const enableBottom = Platform.OS === 'ios' && props.bottomBackgroundColor;
  const enableTop = Platform.OS === 'ios' && props.topBackgroundColor;
  return (
    <RNScrollView
      alwaysBounceVertical={false}
      {...props}
      stickyHeaderIndices={
        enableTop && props.stickyHeaderIndices
          ? props.stickyHeaderIndices.map((index: number) => index + 1)
          : props.stickyHeaderIndices
      }
    >
      {enableTop ? (
        <View
          style={{
            backgroundColor: props.topBackgroundColor,
            height: spacerHeight,
            left: 0,
            position: 'absolute',
            right: 0,
            top: -spacerHeight,
          }}
        />
      ) : null}
      {props.children}
      {enableBottom ? (
        <View
          style={{
            backgroundColor: props.bottomBackgroundColor,
            bottom: -spacerHeight,
            height: spacerHeight,
            left: 0,
            position: 'absolute',
            right: 0,
          }}
        />
      ) : null}
    </RNScrollView>
  );
}
