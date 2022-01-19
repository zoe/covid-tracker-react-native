import * as React from 'react';
import { Image, Platform, StyleSheet, useWindowDimensions } from 'react-native';

export default function HealthProfileIntroModalBgImage() {
  const windowDimensions = useWindowDimensions();
  const height = windowDimensions.height;
  const width = windowDimensions.width;

  const IMAGE_WIDTH_TO_SCREEN_WIDTH_RATIO = 0.75;
  const TOP_IMAGE_HEIGHT_TO_SCREEN_HEIGHT_RATIO = 0.3;
  const BOTTOM_IMAGE_HEIGHT_TO_SCREEN_HEIGHT_RATIO = 0.32;

  const backgroundTop = require('../assets/background_top.png');
  const backgroundBottom = require('../assets/background_bottom.png');

  return (
    <>
      <Image
        source={backgroundBottom}
        style={[
          styles.backgroundImage,
          Platform.OS === 'android'
            ? {
                height: BOTTOM_IMAGE_HEIGHT_TO_SCREEN_HEIGHT_RATIO * height,
                width: IMAGE_WIDTH_TO_SCREEN_WIDTH_RATIO * width,
              }
            : null,
        ]}
      />
      <Image
        source={backgroundTop}
        style={[
          styles.backgroundImage,
          Platform.OS === 'android'
            ? {
                height: TOP_IMAGE_HEIGHT_TO_SCREEN_HEIGHT_RATIO * height,
                width: IMAGE_WIDTH_TO_SCREEN_WIDTH_RATIO * width,
              }
            : null,
        ]}
      />
    </>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },
});
