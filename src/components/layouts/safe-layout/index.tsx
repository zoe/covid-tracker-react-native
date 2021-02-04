import React, { ReactNode } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

interface IProps {
  children: ReactNode;
  withGutter?: boolean;
}

function SafeLayout({ children, withGutter = true }: IProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, { paddingHorizontal: withGutter ? 16 : 0 }]}>{children}</View>
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
