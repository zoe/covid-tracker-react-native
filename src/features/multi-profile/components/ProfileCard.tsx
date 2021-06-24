import { ClippedText, SecondaryText } from '@covid/components/Text';
import { isSECountry } from '@covid/core/localisation/LocalisationService';
import { Profile } from '@covid/core/profile/ProfileService';
import i18n from '@covid/locale/i18n';
import { AvatarName, getAvatarByName } from '@covid/utils/avatar';
import { getDaysAgo } from '@covid/utils/datetime';
import { colors } from '@theme';
import { Card } from 'native-base';
import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { GreenTick } from './GreenTick';
import LastReported from './LastReported';

type TProps = {
  index: number;
  profile: Profile;
  onEditPressed?: VoidFunction;
  testID?: string;
};

export function ProfileCard(props: TProps) {
  const avatarImage = getAvatarByName(props.profile.avatar_name as AvatarName);
  const hasReportedToday = props.profile.last_reported_at && getDaysAgo(props.profile.last_reported_at) === 0;
  const profileName = isSECountry() && props.index === 0 ? 'Jag' : props.profile.name;

  return (
    <Card transparent style={styles.card} testID={props.testID}>
      <View style={styles.avatarContainer}>
        {hasReportedToday ? <GreenTick /> : null}
        <Image resizeMode="contain" source={avatarImage} style={styles.avatar} />
      </View>
      <ClippedText>{profileName}</ClippedText>
      <LastReported timeAgo={props.profile.last_reported_at} />
      {props.onEditPressed ? (
        <TouchableOpacity onPress={props.onEditPressed}>
          <SecondaryText style={styles.secondaryText}>{i18n.t('nav-edit-profile')}</SecondaryText>
        </TouchableOpacity>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  avatar: {
    height: 100,
    width: 100,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
    width: 100,
  },
  card: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    minHeight: 224,
    paddingVertical: 12,
    shadowRadius: 0,
    width: '100%',
  },
  placeholder: {
    height: 20,
    width: 20,
  },
  secondaryText: { color: colors.accent, fontSize: 12, textAlign: 'center' },
});
