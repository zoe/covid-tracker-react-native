import { useTheme } from '@covid/themes';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Icon, TIconName } from '../../icons';
import { Text } from '../../typography';

type TKeyValue = {
  key: string;
  value: any;
};

interface IProps {
  active?: boolean;
  backgroundColor?: string | undefined;
  disabled?: boolean;
  iconName?: TIconName;
  keyValue: TKeyValue;
  onPress: <T>(answer: T) => void;
}

function QuestionBlock({
  active = false,
  backgroundColor = undefined,
  disabled = false,
  iconName = undefined,
  keyValue,
  onPress,
}: IProps) {
  const { colors } = useTheme();
  const bgColor = backgroundColor || colors.ui.dark.bgColor;
  return (
    <TouchableOpacity
      accessible
      accessibilityRole="checkbox"
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, { backgroundColor: active ? colors.teal.main.bgColor : bgColor }]}
    >
      {iconName && <Icon iconName={iconName} iconStyle={{ color: active ? 'white' : 'black' }} />}
      <Text style={{ color: active ? 'white' : 'black' }} textAlign="center" textClass="label">
        {keyValue.key}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
});

export default QuestionBlock;
