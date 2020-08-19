import { Linking } from 'expo';
import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

import Analytics, { events } from '@covid/core/Analytics';

type ExternalCalloutProps = {
  link?: string;
  calloutID: string;
  imageSource: ImageSourcePropType;
  aspectRatio: number;
  postClicked?: VoidFunction;
  screenName: string;
};

export const ExternalCallout: React.FC<ExternalCalloutProps> = (props) => {
  const { calloutID, link, screenName, postClicked } = props;

  function clickCallout() {
    Analytics.track(events.CLICK_CALLOUT, { calloutID, screenName });
    if (link) Linking.openURL(link);
    if (postClicked) postClicked();
  }

  return (
    <TouchableWithoutFeedback style={styles.container} onPress={clickCallout}>
      <View style={styles.viewContainer}>
        <Image source={props.imageSource} style={[styles.image, { aspectRatio: props.aspectRatio }]} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {},

  viewContainer: {
    marginVertical: 20,
    marginHorizontal: 10,
    alignSelf: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
  },
});
