import Tag from '@tracer/components/atoms/Tag';
import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  covidTag: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});

const CovidTag = () => <Tag style={styles.covidTag} text="COVID" />;

export default React.memo(CovidTag);
