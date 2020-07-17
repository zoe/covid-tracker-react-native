import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DrawerNavigationProp } from '@react-navigation/drawer';

import { ApiErrorState } from '@covid/core/api/ApiServiceErrors';
import { ScreenParamList } from '@covid/features/ScreenParamList';

import { Loading } from '../Loading';
import { ProfileCard } from '../ProfileCard';
import { NewProfileCard } from '../NewProfileCard';

export type Profile = {
  id: string;
  name?: string;
  avatar_name?: string;
  reported_by_another?: boolean;
  report_count?: number;
  last_reported_at?: Date;
  created_at?: Date;
};

export const ProfileList: React.FC<
  ApiErrorState & {
    profiles: Profile[];
    isLoaded: boolean;
    addProfile?: VoidFunction;
    onProfileSelected: (profile: string, index: number) => void;
    navigation: DrawerNavigationProp<ScreenParamList, 'SelectProfile'>;
  }
> = ({ status, error, isLoaded, profiles, addProfile, onProfileSelected, onRetry }) => {
  if (!isLoaded) {
    return <Loading status={status} error={error} style={{ borderColor: 'green', borderWidth: 1 }} onRetry={onRetry} />;
  }

  return (
    <>
      <View style={styles.profileList}>
        {profiles.map((profile, i) => {
          return (
            <View style={styles.cardContainer} key={profile.id}>
              <TouchableOpacity onPress={() => onProfileSelected(profile.id, i)}>
                <ProfileCard profile={profile} index={i} />
              </TouchableOpacity>
            </View>
          );
        })}

        {addProfile && (
          <TouchableOpacity style={styles.cardContainer} key="new" onPress={addProfile}>
            <NewProfileCard />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  profileList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    width: '100%',
    alignContent: 'stretch',
  },

  cardContainer: {
    width: '45%',
    marginHorizontal: 8,
    marginVertical: 4,
  },
});
