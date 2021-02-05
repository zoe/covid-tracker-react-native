import React from 'react';
import { View } from 'react-native';

import { Avatar, SpeechCard, Text } from '@covid/components';
import { useTheme } from '@covid/themes';
import { avatarTemp } from '@assets';

function Profile() {
  const theme = useTheme();
  return (
    <View>
      <Avatar imgsrc={avatarTemp} />
      <Text rhythm={8}>Dr. Karsten C. Koenen</Text>
      <Text textClass="pSmallLight" style={{ color: theme.colors.ui.dark }}>
        Professor of Psychiatric Epidemiology, Harvard TH Chan School of Public Health
      </Text>
      <SpeechCard />
    </View>
  );
}

export default Profile;
