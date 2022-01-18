import { DeleteText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import { styling } from '@covid/themes';
import * as React from 'react';
import { TouchableOpacity } from 'react-native';

interface IProps {
  onPress: () => void;
}

export default function DeleteButton(props: IProps) {
  return (
    <TouchableOpacity onPress={props.onPress} style={styling.paddingVertical}>
      <DeleteText style={styling.textCenter}>{i18n.t('covid-test.delete-test')}</DeleteText>
    </TouchableOpacity>
  );
}
