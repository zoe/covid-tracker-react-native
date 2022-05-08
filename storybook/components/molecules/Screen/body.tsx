import React from 'react';
import { Keyboard, ScrollView, StyleProp, StyleSheet, useWindowDimensions, View, ViewStyle } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface IScreenProps {
  scroll?: boolean;
  children?: any;
  keyboardShouldPersistTaps?: boolean | 'never' | 'always' | 'handled' | undefined;
  noKeyboardDismiss?: boolean;
  ref?: string;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

export default function ScreenBody({
  scroll = false,
  keyboardShouldPersistTaps = 'never',
  children,
  style,
  ref,
  testID = 'scroll-view-test-id',
  noKeyboardDismiss = false,
  ...props
}: IScreenProps) {
  const { width } = useWindowDimensions();
  if (!scroll) {
    return <View style={[baseStyle.noScrollView, { width }, style]}>{children}</View>;
  }

  const content = <View style={[baseStyle.view, { width }, style]}>{children}</View>;
  return (
    <ScrollView
      alwaysBounceVertical={false}
      contentContainerStyle={baseStyle.noPadding ? baseStyle.flexGrow : baseStyle.contentContainer}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      ref={ref}
      testID={testID}
      {...props}
    >
      {noKeyboardDismiss ? (
        content
      ) : (
        <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
          {content}
        </TouchableWithoutFeedback>
      )}
    </ScrollView>
  );
}

const baseStyle = StyleSheet.create({
  contentContainer: {},
  flexGrow: { flexGrow: 1 },
  noPadding: { padding: 0 },
  noScrollView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
});
