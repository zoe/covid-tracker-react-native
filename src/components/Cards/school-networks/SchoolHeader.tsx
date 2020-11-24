import React from 'react';
import { View } from 'react-native';

import i18n from '@covid/locale/i18n';

import { STitleText, SSchoolNameText } from './styles';

interface IProps {
  schoolName: string;
}

function SchoolHeader({ schoolName }: IProps) {
  return (
    <View>
      <STitleText textClass="h4Medium">{i18n.t('school-networks.title')}</STitleText>
      <SSchoolNameText textClass="pSmallLight">{schoolName}</SSchoolNameText>
    </View>
  );
}

export default SchoolHeader;
