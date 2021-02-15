import React from 'react';
import { View } from 'react-native';

import { BasicPage, Text, SpeechCard, Icon } from '@covid/components';
import NavigatorService from '@covid/NavigatorService';
import { mentalHealthApiClient } from '@covid/Services';
import UserService from '@covid/core/user/UserService';

import { Profile } from '../partials';
import { MentalHealthInfosRequest } from '../MentalHealthInfosRequest';

function MentalHealthStart() {
  const apiDemoFunctions = async () => {
    console.log('MentalHealthStart apiDemoFunctions');
    const currentPatientId: string = (await new UserService().getFirstPatientId()) ?? '';
    console.log(` > Create mental health record for ${currentPatientId}`);

    // Create a record
    const newMentalHealth: MentalHealthInfosRequest = {
      drinking_alcohol: 'LESS',
      eating_savoury_snacks_or_confectionary: 'LESS',
    };
    await mentalHealthApiClient.add(currentPatientId, newMentalHealth);

    // Retrieve a record (for current user)
    const existingMentalHealthListForUser = await mentalHealthApiClient.get();
    const existingMentalHealth = existingMentalHealthListForUser[0];
    console.log(' > existingMentalHealth is... ', existingMentalHealth);

    const updatedMentalHealth: MentalHealthInfosRequest = {
      ...existingMentalHealth,
      drinking_alcohol: 'MORE',
      eating_savoury_snacks_or_confectionary: 'MORE',
    };
    await mentalHealthApiClient.update(existingMentalHealth.id, updatedMentalHealth);

    const existingMentalHealthUpdated = await mentalHealthApiClient.get();
    console.log(' > existingMentalHealthUpdated is... ', existingMentalHealthUpdated);
  };

  apiDemoFunctions();

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
      <View style={{ flexDirection: 'row', paddingHorizontal: 16 }}>
        <Icon iconName="error_outline" />
        <Text textClass="pLight" style={{ marginLeft: 8 }}>
          This study is currently only available for the “Me” primary profile.
        </Text>
      </View>
    </BasicPage>
  );
}

export default MentalHealthStart;
