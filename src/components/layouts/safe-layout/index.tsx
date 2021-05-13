import React from 'react';
import { SafeAreaView, StyleProp, View, ViewStyle } from 'react-native';

import { useTheme, styling } from '@covid/themes';

interface IProps {
  children: React.ReactNode;
  withGutter?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function SafeLayout(props: IProps) {
  const theme = useTheme();
  return (
    <SafeAreaView style={styling.flex}>
      {props.style || props.withGutter ? (
        <View style={[styling.flex, props.style, props.withGutter && { paddingHorizontal: theme.grid.gutter }]}>
          {props.children}
        </View>
      ) : (
        props.children
      )}
    </SafeAreaView>
  );
}
