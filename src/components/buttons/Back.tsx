import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { colors } from '../../../theme';
import { Icon, View } from 'native-base';

type Props = {
  onPress: () => void;
};

export const BackButton: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.iconButton}>
        <Icon name="chevron-thin-left" type="Entypo" style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    height: 32,
    width: 32,
    marginVertical: 16,
    marginHorizontal: 8,
    backgroundColor: colors.backgroundFour,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 24,
  },
  icon: {
    fontSize: 16,
    color: colors.secondary,
  },
});
