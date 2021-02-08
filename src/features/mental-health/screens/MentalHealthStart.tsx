import React from 'react';

import { BasicPage, Text, SpeechCard } from '@covid/components';
import NavigatorService from '@covid/NavigatorService';

import { Profile } from '../partials';

function MentalHealthStart() {
  return (
    <BasicPage footerTitle="Start" onPress={() => NavigatorService.navigate('MentalHealthChanges', undefined)}>
      <Profile />
      <SpeechCard>
        <Text rhythm={16} textClass="pLight">
          We are currently investigating how the pandemic has had an impact on our mental health.
        </Text>
        <Text rhythm={16} textClass="pLight">
          This short questionnaire is a starting point to allow us to understand better how it has affected us
        </Text>
        <Text textClass="pLight">Thank you for your ongoing support!</Text>
      </SpeechCard>
    </BasicPage>
  );
}

export default MentalHealthStart;
