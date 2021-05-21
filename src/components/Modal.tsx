import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { SafeLayout } from '@covid/components';

interface IProps {
  children?: React.ReactNode;
}

export default function Modal(props: IProps) {
  return (
    <SafeLayout>
      <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}>
        {props.children}
      </ScrollView>
    </SafeLayout>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    borderRadius: 16,
    flexGrow: 0,
    marginBottom: 'auto',
    marginHorizontal: 24,
    marginTop: 'auto',
  },
  contentContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
  },
});
