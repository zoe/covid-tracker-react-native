import IconCard from '@tracer/components/organisms/Card/IconCard';
import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, useWindowDimensions, View, ViewStyle } from 'react-native';
import Carousel from 'react-native-snap-carousel';

export type IconCarouselItem = {
  icon: ReactNode;
  label: string;
};

export interface IIconCarouselProps {
  icons: Array<IconCarouselItem>;
  style?: StyleProp<ViewStyle>;
  onSwipe?: (index: number) => void;
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
export default function IconCarousel({
  style,
  icons,
  onSwipe = () => undefined,
  testID = 'IconCarousel-test-id',
}: IIconCarouselProps) {
  const { width } = useWindowDimensions();
  const iconItem = ({ item, index }: IconCarouselRenderItem) => (
    <View style={baseStyles.view}>
      <IconCard icon={item.icon} key={index.toString()} label={item.label} />
    </View>
  );

  return (
    <Carousel
      useScrollView
      data={icons}
      itemWidth={width / 3}
      loop={icons.length > 2}
      onSnapToItem={(index) => onSwipe(index)}
      renderItem={iconItem}
      sliderWidth={width}
      style={style}
      testID={testID}
    />
  );
}

const baseStyles = StyleSheet.create({
  view: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
