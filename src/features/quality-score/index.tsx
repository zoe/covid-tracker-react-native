import React from 'react';

import Score from './score';
import { SContainerView } from './styles';

function QualityScore() {
  return (
    <SContainerView>
      <Score title="Before the pandemic" />
      <Score title="During the pandemic" />
    </SContainerView>
  );
}

export default QualityScore;
