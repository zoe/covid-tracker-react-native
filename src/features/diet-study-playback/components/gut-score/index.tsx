import React from 'react';

import { isUSCountry } from '@covid/core/localisation/LocalisationService';

import MissingDataText from '../missing-data-text';

import { SContainerView } from './styles';
import Score from './score';

interface IProps {
  beforeScore: number | null;
  duringScore: number;
  minValue?: number;
  maxValue?: number;
}

function GutScore({ beforeScore, duringScore, minValue = 0, maxValue = 10 }: IProps) {
  const duringPandemicSubtitle = isUSCountry() ? 'September - October 2020' : 'August - September 2020';
  return (
    <SContainerView>
      {beforeScore && (
        <Score
          currentValue={beforeScore}
          minValue={minValue}
          maxValue={maxValue}
          title="Before the pandemic"
          subTitle="February 2020"
          style={{ marginBottom: 48 }}
        />
      )}
      {duringScore && (
        <Score
          currentValue={duringScore}
          minValue={minValue}
          maxValue={maxValue}
          title="During the pandemic"
          subTitle={duringPandemicSubtitle}
        />
      )}
      {!beforeScore && <MissingDataText />}
    </SContainerView>
  );
}

export default GutScore;
