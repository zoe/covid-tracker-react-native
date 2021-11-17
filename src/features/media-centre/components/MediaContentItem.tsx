import { mediaContentItem1, mediaContentItem2, mediaContentItem3, mediaContentItem4 } from '@assets';
import { Header3Text } from '@covid/components';
import { TMediaContentItem } from '@covid/core/state/media-centre/types';
import { MediaContentItemDescription } from '@covid/features/media-centre/components/MediaContentItemDescription';
import { sizes } from '@covid/themes';
import { openWebLink } from '@covid/utils/links';
import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

type TProps = {
  item: TMediaContentItem;
  testID: string;
};

// Temporary solution to get the image to load
const SOURCE = {
  1: mediaContentItem1,
  2: mediaContentItem2,
  3: mediaContentItem3,
  4: mediaContentItem4,
};

export const MediaContentItem: React.FC<TProps> = ({ item, testID }) => {
  return (
    <View style={styles.mediaItem}>
      <Header3Text>{item.title}</Header3Text>
      <TouchableOpacity onPress={() => openWebLink(item.url)} style={styles.image} testID={testID}>
        <Image source={SOURCE[item.id]} />
      </TouchableOpacity>
      <MediaContentItemDescription description={item.description} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    marginBottom: sizes.xs,
  },
  mediaItem: {
    paddingVertical: sizes.m,
  },
});
