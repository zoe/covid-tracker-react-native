import { SafeLayout } from '@covid/components';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

interface IProps {
  children?: React.ReactNode;
}

export default function Modal(props: IProps) {
  return (
    <SafeLayout>
      <ScrollView
        alwaysBounceVertical={false}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        {props.children}
      </ScrollView>
    </SafeLayout>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
  },
  scrollView: {
    borderRadius: 16,
    flexGrow: 0,
    marginBottom: 'auto',
    marginHorizontal: 24,
    marginTop: 'auto',
  },
});
