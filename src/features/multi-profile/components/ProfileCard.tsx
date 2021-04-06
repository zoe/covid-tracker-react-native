import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card } from 'native-base';

import { AvatarName, getAvatarByName } from '@covid/utils/avatar';
import { getDaysAgo } from '@covid/utils/datetime';
import { colors } from '@theme';
import i18n from '@covid/locale/i18n';
import { ClippedText, SecondaryText } from '@covid/components/Text';
import { Profile } from '@covid/core/profile/ProfileService';

import LastReported from './LastReported';
import { GreenTick } from './GreenTick';

type Props = {
  profile: Profile;
  onEditPressed?: VoidFunction;
};

export const ProfileCard: React.FC<Props> = (props) => {
  const profile = props.profile;
  const avatarImage = getAvatarByName(profile.avatar_name as AvatarName);
  const hasReportedToday = profile.last_reported_at && getDaysAgo(profile.last_reported_at) === 0;

  return (
    <Card style={styles.card} transparent>
      <View style={styles.avatarContainer}>
        {hasReportedToday && <GreenTick />}
        <Image source={avatarImage} style={styles.avatar} resizeMode="contain" />
      </View>
      <ClippedText>{profile.name}</ClippedText>
      <LastReported timeAgo={profile.last_reported_at} />
      {props.onEditPressed && (
        <TouchableOpacity onPress={props.onEditPressed}>
          <SecondaryText style={{ textAlign: 'center', fontSize: 12, color: colors.accent }}>
            {i18n.t('nav-edit-profile')}
          </SecondaryText>
        </TouchableOpacity>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    width: 100,
    marginTop: 20,
    marginBottom: 10,
  },
  avatar: {
    height: 100,
    width: 100,
  },
  card: {
    backgroundColor: colors.white,
    shadowRadius: 0,
    width: '100%',
    borderRadius: 16,
    minHeight: 224,
    paddingVertical: 12,
    alignItems: 'center',
  },
  placeholder: {
    height: 20,
    width: 20,
  },
});
