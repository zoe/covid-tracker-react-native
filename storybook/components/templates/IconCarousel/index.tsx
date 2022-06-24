import { grid } from '@tracer/branding/grid';
import Row from '@tracer/components/atoms/Row';
import { debug } from '@tracer/stories/debug/debug';
import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
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
  const iconItem = ({ item, index }: IconCarouselRenderItem) => (
    <View key={`carousel-item-${index}`} style={[baseStyles.view, debug()]}>
      <Row style={[baseStyles.itemRow]}>{item.icon}</Row>
      <Row>
        <Text>{item.label}</Text>
      </Row>
    </View>
  );

  return (
    <Carousel
      loop
      useScrollView
      data={icons}
      itemWidth={100}
      onSnapToItem={(index) => onSwipe(index)}
      renderItem={iconItem}
      sliderWidth={500}
      style={style}
      testID={testID}
    />
  );
}

const baseStyles = StyleSheet.create({
  itemRow: {
    padding: grid.g16,
  },
  view: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
