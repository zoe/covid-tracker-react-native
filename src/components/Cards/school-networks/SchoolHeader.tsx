import React from 'react';
import { Text, View } from 'react-native';

import i18n from '@covid/locale/i18n';

interface IProps {
  schoolName: string;
}

function SchoolHeader({ schoolName }: IProps) {
  return (
    <View>
      <Text>{i18n.t('school-networks.title')}</Text>
      <Text>{schoolName}</Text>
    </View>
  );
}

export default SchoolHeader;
