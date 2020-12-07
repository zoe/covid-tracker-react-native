import React from 'react';

import Score from './score';
import { SContainerView } from './styles';

function QualityScore() {
  return (
    <SContainerView>
      <Score title="Before the pandemic" subTitle="February 2020" style={{ marginBottom: 48 }} />
      <Score title="During the pandemic" subTitle="September - October 2020" />
    </SContainerView>
  );
}

export default QualityScore;
