import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

import appConfig from '@covid/appConfig';

import { Text } from '../typography';

const styles = StyleSheet.create({
  container: {
    height: 200,
    backgroundColor: 'white',
    borderRadius: 16,
    marginVertical: 12,
    padding: 20,
    justifyContent: 'space-between',
  },
  base: {
    borderRadius: 6,
    height: 20,
  },
  one: {},
  two: {
    width: '30%',
    marginTop: 12,
  },
  three: {
    height: 12,
    width: '35%',
    marginTop: 12,
  },
});

type ContentErrorViewProps = {
  message: string;
};

export const ContentErrorView: React.FC<ContentErrorViewProps> = ({ message }) => {
  return (
    <View
      style={[
        styles.container,
        {
          justifyContent: 'center',
        },
      ]}>
      <Text textAlign="center" textClass="p" style={{ marginHorizontal: 12 }}>
        {message}
      </Text>
    </View>
  );
};

type ContentLoadingViewProps = {
  loading?: boolean;
  errorMessage?: string;
};

export const ContentLoadingView: React.FC<ContentLoadingViewProps> = ({ loading, errorMessage, children }) => {
  const showShimmers = appConfig.isQA === false;
  if (errorMessage) {
    return <ContentErrorView message={errorMessage} />;
  }

  return (
    <View>
      {loading && (
        <View style={styles.container}>
          {showShimmers && (
            <View>
              <ShimmerPlaceholder LinearGradient={LinearGradient} style={[styles.base]} />
              <ShimmerPlaceholder LinearGradient={LinearGradient} style={[styles.base, styles.two]} />
            </View>
          )}
          {showShimmers && <ShimmerPlaceholder LinearGradient={LinearGradient} style={[styles.base, styles.three]} />}
        </View>
      )}
      <View style={[loading && { position: 'absolute', opacity: 0 }]}>{children}</View>
    </View>
  );
};
