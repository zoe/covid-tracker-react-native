import { RegularText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import { colors } from '@theme';
import React from 'react';
import { TouchableOpacity } from 'react-native';

interface IProps {
  onPress: () => void;
  text: string;
}

function RemoveSchoolButton({ onPress, text }: IProps) {
  return (
    <TouchableOpacity onPress={onPress} style={{ margin: 16 }}>
      <RegularText style={{ color: colors.coral, textAlign: 'center' }}>{i18n.t(text)}</RegularText>
    </TouchableOpacity>
  );
}

export default RemoveSchoolButton;
