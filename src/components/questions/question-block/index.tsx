import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { useTheme } from '@covid/themes';

import { Icon, TIconName } from '../../icons';
import { Text } from '../../typography';

type TKeyValue = {
  key: string;
  value: any;
};

interface IProps {
  active?: boolean;
  iconName?: TIconName;
  keyValue: TKeyValue;
  onPress: <T>(answer: T) => void;
}

function QuestionBlock({ active = false, iconName = undefined, keyValue, onPress }: IProps) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { backgroundColor: active ? colors.burgundy.main.bgColor : colors.ui.main.bgColor }]}>
      {iconName && <Icon iconName={iconName} />}
      <Text textClass="label" textAlign="center">
        {keyValue.key}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'green',
    alignItems: 'center',
    borderRadius: 8,
    justifyContent: 'center',
    padding: 8,
  },
});

export default QuestionBlock;
