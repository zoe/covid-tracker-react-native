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
      <STitleText textClass="h4Medium" colorPalette="uiDark" colorShade="darker" inverted>
        {i18n.t('school-networks.title')}
      </STitleText>
      <SSchoolNameText textClass="pSmallLight" colorPalette="uiDark" colorShade="main" inverted>
        {schoolName}
      </SSchoolNameText>
    </View>
  );
}

export default SchoolHeader;
