import React from 'react';

import { Text } from '@covid/components';

interface IProps {
  subTitle: string;
  title: string;
}

function DietScoreHeader({ subTitle, title }: IProps) {
  return (
    <>
      <Text textClass="h4Regular" rhythm={8}>
        {title}
      </Text>
      <Text textClass="pSmallLight" colorPalette="uiDark" colorShade="dark" inverted>
        {subTitle}
      </Text>
    </>
  );
}

export default DietScoreHeader;
