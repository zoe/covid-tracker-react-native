import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import moment from 'moment';

import AssessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { RegularText } from '@covid/components/Text';
import { chevronRight, pending, tick } from '@assets';
import { CovidTest, CovidTestType } from '@covid/core/user/dto/CovidTestContracts';
import { colors } from '@theme';
import i18n from '@covid/locale/i18n';
import { CovidTestMechanismOptions } from '@covid/core/user/dto/UserAPIContracts';
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
