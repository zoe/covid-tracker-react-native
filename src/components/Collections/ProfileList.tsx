import React from 'react';
import { StyleSheet, View, TouchableOpacity} from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

import { ApiErrorState } from '@covid/core/api/ApiServiceErrors';
import { ScreenParamList } from '@covid/features/ScreenParamList';

import { Loading } from '../Loading';
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

interface Props extends ApiErrorState {
  profiles: Profile[];
  isLoaded: boolean;
  addProfile?: VoidFunction;
  onProfileSelected: (profile: string, index: number) => void;
  navigation: DrawerNavigationProp<ScreenParamList, 'SelectProfile'>;
  renderItem: (profile: Profile, index: number) => React.ReactNode;
  renderCreateItem?: () => React.ReactNode;
}

export const ProfileList: React.FC<Props> = ({
  status,
  error,
  isLoaded,
  profiles,
  addProfile,
  onProfileSelected,
  onRetry,
  renderItem,
  renderCreateItem = () => <NewProfileCard />,
}) => {
  if (!isLoaded) {
    return <Loading status={status} error={error} style={{ borderColor: 'green', borderWidth: 1 }} onRetry={onRetry} />;
  }

  return (
    <View style={styles.profileList}>
      {profiles.map((profile, i) => {
        return (
          <View style={styles.cardContainer} key={profile.id}>
            <TouchableOpacity onPress={() => onProfileSelected(profile.id, i)}>
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
