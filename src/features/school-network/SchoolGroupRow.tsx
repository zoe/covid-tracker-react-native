import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { RegularText } from '@covid/components/Text';
import { colors } from '@theme';
import { SchoolGroupModel } from '@covid/core/schools/Schools.dto';

type Props = {
  onPress: VoidFunction;
  group: SchoolGroupModel;
};

export const SchoolGroupRow: React.FC<Props> = ({ onPress, group }) => {
  return (
    <View style={styles.container}>
      <RegularText>{group.name}</RegularText>
      <TouchableOpacity onPress={onPress}>
        <RegularText style={{ color: colors.coral }}>Remove</RegularText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
