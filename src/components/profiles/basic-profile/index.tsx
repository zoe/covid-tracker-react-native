import React from 'react';
import { ImageSourcePropType, View } from 'react-native';

import { Avatar, Text } from '@covid/components';
import { useTheme } from '@covid/themes';

interface IProps {
  imgsrc: ImageSourcePropType;
  location: string;
  name: string;
  title: string;
}

function BasicProfile({ imgsrc, location, name, title }: IProps) {
  const { colors, grid } = useTheme();
  return (
    <View>
      <View style={{ marginBottom: grid.xs, paddingHorizontal: grid.gutter }}>
        <Avatar imgsrc={imgsrc} />
        <Text rhythm={8}>{name}</Text>
        <Text textClass="pSmallLight" style={{ color: colors.uiDark.dark.bgColor }}>
          {title}, {location}
        </Text>
      </View>
    </View>
  );
}

export default BasicProfile;
