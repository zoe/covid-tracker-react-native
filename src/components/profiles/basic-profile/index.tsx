import React from 'react';
import { View } from 'react-native';

import { Text } from '@covid/components';
import { useTheme } from '@covid/themes';
import { getDietStudyDoctorImage } from '@covid/features/diet-study-playback/v2/utils';

interface IProps {
  location: string;
  name: string;
  title: string;
}

function BasicProfile({ location, name, title }: IProps) {
  const { colors, grid } = useTheme();
  return (
    <View>
      <View style={{ marginBottom: grid.xs, paddingHorizontal: grid.gutter }}>
        {getDietStudyDoctorImage()}
        <Text rhythm={8}>{name}</Text>
        <Text textClass="pSmallLight" style={{ color: colors.uiDark.dark.bgColor }}>
          {title}, {location}
        </Text>
      </View>
    </View>
  );
}

export default BasicProfile;
