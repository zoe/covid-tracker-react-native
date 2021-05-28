import { SafeLayout } from '@covid/components';
import { generalApiClient } from '@covid/Services';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

interface IProps {
  children?: React.ReactNode;
  event?: string;
}

export default function Modal(props: IProps) {
  useEffect(() => {
    if (props.event) {
      generalApiClient.postUserEvent(props.event);
    }
  }, [props.event]);
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
