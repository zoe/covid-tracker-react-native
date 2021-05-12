import { avatarBlank } from '@assets';
import { TStyleObject } from '@covid/utils/types';
import React from 'react';
import { Image, ImageSourcePropType, View } from 'react-native';

interface IProps {
  imgsrc?: ImageSourcePropType;
  imgStyle?: TStyleObject;
  size?: number;
}

function Avatar({ imgsrc = avatarBlank, imgStyle = {}, size = 60 }: IProps) {
  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: 'pink',
        borderColor: 'white',
        borderRadius: size,
        borderWidth: 2,
        height: size,
        justifyContent: 'center',
        overflow: 'hidden',
        width: size,
      }}
    >
      <Image
        source={imgsrc}
        style={{
          aspectRatio: 1.0,
          height: undefined,
          resizeMode: 'contain',
          width: size,
          ...imgStyle,
        }}
      />
    </View>
  );
}

export default Avatar;
