import Analytics, { events } from '@covid/core/Analytics';
import { Linking } from 'expo';
import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

type ExternalCalloutProps = {
  link: string;
  calloutID: string;
  imageSource: ImageSourcePropType;
  aspectRatio: number;
};

export const ExternalCallout = (props: ExternalCalloutProps) => {
  function clickCallout() {
    const calloutID = props.calloutID;
    Analytics.track(events.CLICK_CALLOUT, { calloutID });
    Linking.openURL(props.link);
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
