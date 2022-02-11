import * as React from 'react';
import { Image, StyleSheet } from 'react-native';

const backgroundTop = require('../assets/background_top.png');
const backgroundBottom = require('../assets/background_bottom.png');

export default function HealthProfileIntroModalBgImage() {
  return (
    <>
      <Image source={backgroundBottom} style={styles.backgroundImage} />
      <Image source={backgroundTop} style={styles.backgroundImage} />
    </>
  );
}

const styles = StyleSheet.create({
  backgroundImage: StyleSheet.absoluteFillObject,
});
