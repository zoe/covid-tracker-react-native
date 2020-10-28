import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import Screen from '@covid/components/Screen';
import { ScreenParamList } from '@covid/features/ScreenParamList';

import { JoinHeader } from './partials';

interface IProps {
  navigation: StackNavigationProp<ScreenParamList, 'ConfirmSchool'>;
  route: RouteProp<ScreenParamList, 'ConfirmSchool'>;
}

function JoinHigherEducationScreen({ navigation, route }: IProps) {
  const { patientData } = route.params;
  console.log('** patient data: ', patientData);
  return (
    <Screen profile={patientData.patientState.profile} navigation={navigation}>
      <View style={styles.container}>
        <JoinHeader
          headerText="school-networks.join-school.title-higher-education"
          bodyText="school-networks.join-school.description-higher-education"
          currentStep={1}
          maxSteps={3}
        />
        <View>
          <Text>Join Higher Education Screen</Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spacer: {
    marginTop: 16,
  },
});

export default JoinHigherEducationScreen;
