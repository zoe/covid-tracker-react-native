import { Icon } from '@covid/components/icons';
import { Text } from '@covid/components/typography';
import i18n from '@covid/locale/i18n';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

interface IProps {
  style?: StyleProp<ViewStyle>;
}

function BackButton({ style }: IProps) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={navigation.goBack}
      style={[{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }, style]}
    >
      <Icon iconName="big-arrow-left" style={{ marginRight: 8 }} />
      <Text>{i18n.t('navigation.back')}</Text>
    </TouchableOpacity>
  );
}

export default BackButton;
