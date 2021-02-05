import React from 'react';

import { isUSCountry } from '@covid/core/localisation/LocalisationService';

import MissingDataText from '../missing-data-text';

import Score from './score';
import { SContainerView } from './styles';

interface IProps {
  beforeScore: number;
  duringScore: number;
  minValue?: number;
  maxValue?: number;
}

function QualityScore({ beforeScore, duringScore, minValue = 5, maxValue = 15 }: IProps) {
  const duringPandemicSubtitle = isUSCountry() ? 'September - October 2020' : 'August - September 2020';
  return (
    <SContainerView>
      {beforeScore && (
        <Score
          currentValue={beforeScore}
          minValue={minValue}
          minValueLabel="Poor"
          maxValue={maxValue}
          maxValueLabel="Excellent"
          title="Before the pandemic"
          subTitle="February 2020"
          style={{ marginBottom: 48 }}
        />
      )}
      <Score
        currentValue={duringScore}
        minValue={minValue}
        minValueLabel="Poor"
        maxValue={maxValue}
        maxValueLabel="Excellent"
        title="During the pandemic"
        subTitle={duringPandemicSubtitle}
      />
      {!beforeScore && <MissingDataText />}
    </SContainerView>
  );
}

export default QualityScore;
