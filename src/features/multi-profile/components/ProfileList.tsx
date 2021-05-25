import { Loading, LoadingModal } from '@covid/components/Loading';
import { ApiErrorState } from '@covid/core/api/ApiServiceErrors';
import { Profile } from '@covid/core/profile/ProfileService';
import { colors } from '@theme';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { NewProfileCard } from './NewProfileCard';

interface IProps extends ApiErrorState {
  profiles: Profile[];
  isLoaded: boolean;
  addProfile?: VoidFunction;
  onProfileSelected: (profile: Profile, index: number) => void;
  renderItem: (profile: Profile, index: number) => React.ReactNode;
  renderCreateItem?: () => React.ReactNode;
}

export function ProfileList({
  isApiError,
  status,
  error,
  isLoaded,
  profiles,
  addProfile,
  onProfileSelected,
  onRetry,
  renderItem,
  renderCreateItem = () => <NewProfileCard />,
}: IProps) {
  if (!isLoaded) {
    return <Loading error={error} onRetry={onRetry} status={status} />;
  }

  return (
    <>
      {isApiError && <LoadingModal error={error} onRetry={onRetry} status={status} />}
      <View style={styles.profileList}>
        {profiles.map((profile, i) => {
          return (
            <View key={profile.id} style={styles.cardContainer}>
              <TouchableOpacity onPress={() => onProfileSelected(profile, i)}>
                {renderItem(profile, i)}
              </TouchableOpacity>
            </View>
          );
        })}

        {addProfile ? (
          <View key="new" style={styles.cardContainer}>
            <TouchableOpacity onPress={addProfile}>{renderCreateItem()}</TouchableOpacity>
          </View>
        ) : null}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 8,
    marginVertical: 4,
    width: '45%',
  },

  inputStyle: {
    color: colors.primary,
    flex: 1,
    fontSize: 16,
    paddingLeft: 12,
    paddingRight: 16,
  },

  profileList: {
    alignContent: 'stretch',
    alignItems: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
});
