import { RegularText } from '@covid/components/Text';
import { ISchoolGroupModel } from '@covid/core/schools/Schools.dto';
import { colors } from '@theme';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type Props = {
  onPress: VoidFunction;
  group: ISchoolGroupModel;
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
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-between',
  },
});
