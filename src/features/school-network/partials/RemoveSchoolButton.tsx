import React from 'react';
import { TouchableOpacity } from 'react-native';

import { RegularText } from '@covid/components/Text';
import { colors } from '@theme';
import i18n from '@covid/locale/i18n';

interface IProps {
  onPress: () => void;
  text: string;
}

function RemoveSchoolButton({ onPress, text }: IProps) {
  return (
    <TouchableOpacity style={{ margin: 16 }} onPress={onPress}>
      <RegularText style={{ textAlign: 'center', color: colors.coral }}>{i18n.t(text)}</RegularText>
    </TouchableOpacity>
  );
}

export default RemoveSchoolButton;
