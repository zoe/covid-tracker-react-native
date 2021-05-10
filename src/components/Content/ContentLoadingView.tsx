import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

import { Text } from '../typography';

const styles = StyleSheet.create({
  base: {
    borderRadius: 6,
    height: 20,
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    height: 200,
    justifyContent: 'space-between',
    marginVertical: 12,
    padding: 20,
  },
  one: {},
  three: {
    height: 12,
    marginTop: 12,
    width: '35%',
  },
  two: {
    marginTop: 12,
    width: '30%',
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
      ]}
    >
      <Text style={{ marginHorizontal: 12 }} textAlign="center" textClass="p">
        {message}
      </Text>
    </View>
  );
};

type ContentLoadingViewProps = {
  loading?: boolean;
  errorMessage?: string;
  disableShimmers?: boolean;
};

export const ContentLoadingView: React.FC<ContentLoadingViewProps> = ({
  loading,
  errorMessage,
  disableShimmers,
  children,
}) => {
  const enableShimmers = !disableShimmers;
  if (errorMessage) {
    return <ContentErrorView message={errorMessage} />;
  }

  return (
    <View>
      {loading && enableShimmers && (
        <View style={styles.container}>
          <View>
            <ShimmerPlaceholder LinearGradient={LinearGradient} style={[styles.base]} />
            <ShimmerPlaceholder LinearGradient={LinearGradient} style={[styles.base, styles.two]} />
          </View>
          <ShimmerPlaceholder LinearGradient={LinearGradient} style={[styles.base, styles.three]} />
        </View>
      )}
      <View style={[loading && { opacity: 0, position: 'absolute' }]}>{children}</View>
    </View>
  );
};
