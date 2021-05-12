import { useTheme } from '@covid/themes';
import React from 'react';
import { View } from 'react-native';

import { getDietStudyDoctorImage } from '../../../features/diet-study-playback/v2/utils';
import { Text } from '../../typography';

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
        <Text style={{ color: colors.uiDark.dark.bgColor }} textClass="pSmallLight">
          {title}, {location}
        </Text>
      </View>
    </View>
  );
}

export default BasicProfile;
