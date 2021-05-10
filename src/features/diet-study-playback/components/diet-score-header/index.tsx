import { Text } from '@covid/components';
import { TGridSizes } from '@covid/themes';
import React from 'react';

interface IProps {
  subTitle: string;
  rhythm?: TGridSizes;
  title: string;
}

function DietScoreHeader({ rhythm = 16, subTitle, title }: IProps) {
  return (
    <>
      <Text rhythm={8} textClass="h4">
        {title}
      </Text>
      <Text inverted colorPalette="uiDark" colorShade="dark" rhythm={rhythm} textClass="pSmallLight">
        {subTitle}
      </Text>
    </>
  );
}

export default DietScoreHeader;
