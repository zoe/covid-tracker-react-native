import React from 'react';

import { SContainerView } from './styles';
import Score from './score';

function GutScore() {
  return (
    <SContainerView>
      <Score
        currentValue={Math.round(Math.random() * 10)}
        minValue={0}
        maxValue={10}
        title="Before the pandemic"
        subTitle="February 2020"
        style={{ marginBottom: 48 }}
      />
      <Score
        currentValue={Math.round(Math.random() * 10)}
        minValue={0}
        maxValue={10}
        title="During the pandemic"
        subTitle="September - October 2020"
      />
    </SContainerView>
  );
}

export default GutScore;
