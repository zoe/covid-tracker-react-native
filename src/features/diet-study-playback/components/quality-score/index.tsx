import { isUSCountry } from '@covid/core/localisation/LocalisationService';
import React from 'react';

import MissingDataText from '../missing-data-text';
import Score from './score';
import { SContainerView } from './styles';

interface IProps {
  beforeScore: number | null;
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
          maxValue={maxValue}
          maxValueLabel="Excellent"
          minValue={minValue}
          minValueLabel="Poor"
          style={{ marginBottom: 48 }}
          subTitle="February 2020"
          title="Before the pandemic"
        />
      )}
      {duringScore && (
        <Score
          currentValue={duringScore}
          maxValue={maxValue}
          maxValueLabel="Excellent"
          minValue={minValue}
          minValueLabel="Poor"
          subTitle={duringPandemicSubtitle}
          title="During the pandemic"
        />
      )}
      {!beforeScore && <MissingDataText />}
    </SContainerView>
  );
}

export default QualityScore;
