import React from 'react';

import Score from './score';
import { SContainerView } from './styles';

function QualityScore() {
  const minValue = 5;
  const maxValue = 15;
  const getRandomValue = () => minValue + Math.round(Math.random() * (maxValue - minValue));
  return (
    <SContainerView>
      <Score
        currentValue={getRandomValue()}
        minValue={minValue}
        minValueLabel="Poor"
        maxValue={maxValue}
        maxValueLabel="Excellent"
        title="Before the pandemic"
        subTitle="February 2020"
        style={{ marginBottom: 48 }}
      />
      <Score
        currentValue={getRandomValue()}
        minValue={minValue}
        minValueLabel="Poor"
        maxValue={maxValue}
        maxValueLabel="Excellent"
        title="During the pandemic"
        subTitle="September - October 2020"
      />
    </SContainerView>
  );
}

export default QualityScore;
