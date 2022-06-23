import React, { ReactNode } from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import Carousel from 'react-native-snap-carousel';

export type IconCarouselItem = {
  icon: ReactNode;
  label: string;
};

export interface IIconCarouselProps {
  icons: IconCarouselItem[];
  style?: StyleProp<ViewStyle>;
  onSwipe: (index: number) => void;
  testID?: string;
}

export interface IconCarouselRenderItem {
  item: IconCarouselItem;
  index: number;
}

/**
 * IconCarousel
 *
 * @param style custom styling, overrides all other styles
 */
export default function IconCarousel({ style, icons, onSwipe, testID = 'IconCarousel-test-id' }: IIconCarouselProps) {
  const iconItem = ({ item, index }: IconCarouselRenderItem) => (
    <View key={`carousel-item-${index}`}>
      <>{item.icon}</>
      <Text>{item.label}</Text>
    </View>
  );

  return (
    <Carousel
      useScrollView
      data={icons}
      itemWidth={300}
      layout="default"
      onSnapToItem={(index) => onSwipe(index)}
      renderItem={iconItem}
      sliderWidth={300}
      style={style}
      testID={testID}
    />
  );
}
