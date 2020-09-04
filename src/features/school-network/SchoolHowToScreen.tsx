import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Linking, StyleSheet } from 'react-native';
import { View } from 'native-base';

import { colors } from '@theme';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { HeaderText, RegularText, RegularBoldText } from '@covid/components/Text';
import { Coordinator } from '@covid/core/Coordinator';
import ProgressStatus from '@covid/components/ProgressStatus';
import { Button } from '@covid/components/Buttons/Button';

import schoolNetworkCoordinator from './SchoolNetworkCoordinator';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'SchoolHowTo'>;
  route: RouteProp<ScreenParamList, 'SchoolHowTo'>;
};

export const SchoolHowToScreen: React.FC<Props> = ({ route, navigation }) => {
  const primaryAction = () => {};

  const secondaryAction = () => {};

  const bottomAction = () => {};

  // @ts-ignore
  const coordinator: Coordinator = schoolNetworkCoordinator;

  const goNext = () => {
    coordinator.gotoNextScreen(route.name);
  };

  const openUrl = (link: string) => {
    Linking.openURL(link);
  };

  const currentPatient = coordinator.patientData?.patientState;

  return (
    <View style={styles.container}>
      <Screen profile={currentPatient?.profile} navigation={navigation} style={styles.container}>
        <View style={styles.container}>
          <Header>
            <HeaderText style={styles.header}>How to connect to a school network</HeaderText>
          </Header>

          <ProgressBlock>
            <ProgressStatus step={1} maxSteps={6} />
          </ProgressBlock>

          <View style={styles.description}>
            <RegularBoldText>Existing profiles</RegularBoldText>
            <RegularText style={styles.label}>
              If you’ve already created a profile for your children, open the side nav, tap on “My profiles” and tap on
              your child’s account. Then, tap “School Network”. Once you add a school it will appear on your dashboard
              under “My Networks”
            </RegularText>
            <View style={{ height: 24 }} />
            <RegularBoldText>New profiles</RegularBoldText>
            <RegularText style={styles.label}>
              While creating a new profile, you will find a dropdown labeled “School Network”. Select the school you
              want to connect to and it will appear on your dashboard once their profile is created.
            </RegularText>
          </View>
        </View>
      </Screen>

      <View style={styles.buttonsContainer}>
        <Button onPress={goNext} branded>
          View profiles now
        </Button>
        <Button>Skip</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundFour,
  },

  header: {
    marginRight: 72,
  },

  description: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  label: {
    marginTop: 4,
  },

  buttonsContainer: {
    paddingHorizontal: 8,
    marginBottom: 48,
  },
});
