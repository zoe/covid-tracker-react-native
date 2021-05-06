import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ApiErrorState } from '@covid/core/api/ApiServiceErrors';
import { colors } from '@covid/theme';
import { Profile } from '@covid/core/profile/ProfileService';
import { Loading, LoadingModal } from '@covid/components/Loading';

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
    return <Loading status={status} error={error} onRetry={onRetry} />;
  }

  return (
    <>
      {isApiError && <LoadingModal status={status} error={error} onRetry={onRetry} />}
      <View style={styles.profileList}>
        {profiles.map((profile, i) => {
          return (
            <View style={styles.cardContainer} key={profile.id}>
              <TouchableOpacity onPress={() => onProfileSelected(profile, i)}>
                {renderItem(profile, i)}
              </TouchableOpacity>
            </View>
          );
        })}

        {addProfile && (
          <View style={styles.cardContainer} key="new">
            <TouchableOpacity onPress={addProfile}>{renderCreateItem()}</TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  profileList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    width: '100%',
    alignContent: 'stretch',
  },

  inputStyle: {
    color: colors.primary,
    flex: 1,
    fontSize: 16,
    paddingLeft: 12,
    paddingRight: 16,
  },

  cardContainer: {
    width: '45%',
    marginHorizontal: 8,
    marginVertical: 4,
  },
});
