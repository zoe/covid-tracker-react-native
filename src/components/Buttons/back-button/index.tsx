import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import i18n from '@covid/locale/i18n';
import { TStyleObject } from '@covid/utils/types';

import { Icon } from '../../icons';
import { Text } from '../../typography';

interface IProps {
  style?: TStyleObject;
}

function BackButton({ style }: IProps) {
  const { goBack } = useNavigation();
  return (
    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', ...style }}
      onPress={() => goBack()}>
      <Icon iconName="big-arrow-left" style={{ marginRight: 8 }} />
      <Text>{i18n.t('navigation.back')}</Text>
    </TouchableOpacity>
  );
}

export default BackButton;
