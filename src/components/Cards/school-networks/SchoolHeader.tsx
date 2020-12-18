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
      <STitleText textClass="h4Medium" colorPalette="uiDark" colorShade="darker" textAlign="left" inverted>
        {schoolName}
      </STitleText>
    </View>
  );
}

export default SchoolHeader;
