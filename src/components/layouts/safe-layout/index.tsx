import React, { ReactNode } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import { useTheme } from '@covid/themes';

interface IProps {
  children: ReactNode;
  withGutter?: boolean;
  style?: object;
}

function SafeLayout({ children, withGutter = true, style }: IProps) {
  const theme = useTheme();
  return (
    <SafeAreaView style={[styles.safeArea, style]}>
      <View style={[styles.container, { paddingHorizontal: withGutter ? theme.grid.gutter : 0 }]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});

export default SafeLayout;
