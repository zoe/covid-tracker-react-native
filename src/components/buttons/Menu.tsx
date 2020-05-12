import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet, Image } from 'react-native';
import { menuIcon } from '../../../assets';
import { colors } from '../../../theme';

type Props = {
  onPress: () => void;
};

export const MenuButton: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={menuIcon} style={styles.menuIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuIcon: {
    height: 20,
    width: 20,
    tintColor: colors.primary,
    alignSelf: 'flex-end',
    marginRight: 15,
    marginTop: 10,
  },
});
