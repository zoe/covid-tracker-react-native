import React from 'react';

import { Text } from '@covid/components';
import { TGridSizes } from '@covid/themes';

interface IProps {
  subTitle: string;
  rhythm?: TGridSizes;
  title: string;
}

function DietScoreHeader({ rhythm = 16, subTitle, title }: IProps) {
  return (
    <>
      <Text textClass="h4Regular" rhythm={8}>
        {title}
      </Text>
      <Text textClass="pSmallLight" colorPalette="uiDark" colorShade="dark" inverted rhythm={rhythm}>
        {subTitle}
      </Text>
    </>
  );
}

export default DietScoreHeader;
