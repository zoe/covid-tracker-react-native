import React from 'react';
import { View } from 'react-native';

import { Avatar, Text } from '@covid/components';
import { useTheme } from '@covid/themes';
import { avatarTemp } from '@assets';

function Profile() {
  const { colors, grid } = useTheme();
  return (
    <View>
      <View style={{ marginBottom: grid.xs, paddingHorizontal: grid.gutter }}>
        <Avatar imgsrc={avatarTemp} />
        <Text rhythm={8}>Dr. Karsten C. Koenen</Text>
        <Text textClass="pSmallLight" style={{ color: colors.uiDark.dark.bgColor }}>
          Professor of Psychiatric Epidemiology, Harvard TH Chan School of Public Health
        </Text>
      </View>
    </View>
  );
}

export default Profile;
