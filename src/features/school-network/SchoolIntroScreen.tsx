import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Linking, StyleSheet } from 'react-native';
import { View } from 'native-base';

import { colors } from '@theme';
import Screen, { Header } from '@covid/components/Screen';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { HeaderText, RegularText, RegularBoldText } from '@covid/components/Text';
import { Coordinator } from '@covid/core/Coordinator';
import { Button } from '@covid/components/Buttons/Button';

import schoolNetworkCoordinator from './SchoolNetworkCoordinator';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'SchoolIntro'>;
  route: RouteProp<ScreenParamList, 'SchoolIntro'>;
};

export const SchoolIntroScreen: React.FC<Props> = ({ route, navigation }) => {
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
            <HeaderText style={styles.header}>You can now connect your children to their school network</HeaderText>
          </Header>

          <View style={styles.description}>
            <RegularBoldText>Why connect to a school network?</RegularBoldText>
            <RegularText>{`Lorem ipsum\rSafety`}</RegularText>
            <View style={{ height: 16 }} />
            <RegularBoldText>How it works </RegularBoldText>
            <RegularText>{`Lorem ipsum\rSafety`}</RegularText>
          </View>
        </View>
      </Screen>

      <View style={styles.buttonsContainer}>
        <Button onPress={goNext} branded>
          Connect to school network
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

  button: {
    marginVertical: 16,
    marginHorizontal: 24,
    marginBottom: 32,
  },

  buttonsContainer: {
    paddingHorizontal: 8,
    marginBottom: 48,
  },
});
