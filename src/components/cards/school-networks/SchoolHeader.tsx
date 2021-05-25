import i18n from '@covid/locale/i18n';
import React from 'react';
import { View } from 'react-native';

import { SSchoolNameText, STitleText } from './styles';

interface IProps {
  schoolName: string;
}

function SchoolHeader({ schoolName }: IProps) {
  return (
    <View>
      <STitleText inverted colorPalette="uiDark" colorShade="darker" textAlign="left" textClass="h4Medium">
        {schoolName}
      </STitleText>
    </View>
  );
}

export default SchoolHeader;
