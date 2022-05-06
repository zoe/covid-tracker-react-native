import { grid } from '@tracer/branding/grid';
import React from 'react';
import { Image, ImageProps, ImageSourcePropType, StyleSheet } from 'react-native';

export interface ICardImageProps {
  source: ImageSourcePropType;
  style?: ImageProps;
}

export default function CardImage({ source, style }: ICardImageProps) {
  return (
    <>
      <Image source={source} style={[baseStyle.img, style]} />
    </>
  );
}

const baseStyle = StyleSheet.create({
  img: {
    borderTopLeftRadius: grid.g16,
    borderTopRightRadius: grid.g16,
    resizeMode: 'contain',
  },
});
