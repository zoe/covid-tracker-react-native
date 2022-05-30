import * as screens from '@covid/features/screens';
import { TScreenParamList } from '@covid/routes/types';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import { Platform } from 'react-native';

// TODO: Kris - Change this to use NativeStack, requires package updates
const Stack = createStackNavigator<TScreenParamList>();
const transitionPresets = Platform.OS === 'android' ? TransitionPresets.FadeFromBottomAndroid : {};

const options = {
  headerShown: false,
  transitionPresets,
};

export default function AssessmentStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen component={screens.GeneralSymptomsScreen} name="GeneralSymptoms" options={options} />
      <Stack.Screen component={screens.GutStomachSymptomsScreen} name="GutStomachSymptoms" options={options} />
      <Stack.Screen component={screens.HeadSymptomsScreen} name="HeadSymptoms" options={options} />
      <Stack.Screen component={screens.OtherSymptomsScreen} name="OtherSymptoms" options={options} />
      <Stack.Screen component={screens.ThroatChestSymptomsScreen} name="ThroatChestSymptoms" options={options} />
      <Stack.Screen component={screens.TreatmentOtherScreen} name="TreatmentOther" options={options} />
      <Stack.Screen component={screens.TreatmentSelectionScreen} name="TreatmentSelection" options={options} />
    </Stack.Navigator>
  );
}
