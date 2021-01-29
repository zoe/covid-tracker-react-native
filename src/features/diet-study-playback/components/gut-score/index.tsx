import React from 'react';

import MissingDataText from '../missing-data-text';

import { SContainerView } from './styles';
import Score from './score';

interface IProps {
  beforeScore: number;
  duringScore: number;
  minValue?: number;
  maxValue?: number;
}

function GutScore({ beforeScore, duringScore, minValue = 0, maxValue = 10 }: IProps) {
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
      <Score
        currentValue={duringScore}
        minValue={minValue}
        maxValue={maxValue}
        title="During the pandemic"
        subTitle="September - October 2020"
      />
      {!beforeScore && <MissingDataText />}
    </SContainerView>
  );
}

export default GutScore;
