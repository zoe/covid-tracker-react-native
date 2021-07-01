import { Button } from '@covid/components/buttons/Button';
import Screen from '@covid/components/Screen';
import { RegularText } from '@covid/components/Text';
import { schoolNetworkCoordinator } from '@covid/features/school-network/SchoolNetworkCoordinator';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { JoinHeader } from './partials';

interface IProps {
  navigation: StackNavigationProp<ScreenParamList, 'ConfirmSchool'>;
  route: RouteProp<ScreenParamList, 'ConfirmSchool'>;
}

function ConfirmSchoolScreen({ route, navigation }: IProps) {
  const handleOnPress = async () => {
    await schoolNetworkCoordinator.setSelectedSchool(route.params?.school);
    schoolNetworkCoordinator.goToJoinGroup();
  };

  return (
    <Screen
      navigation={navigation}
      profile={route.params?.patientData?.patientState?.profile}
      testID="confirm-school-screen"
    >
      <View style={styles.container}>
        <JoinHeader
          bodyText="school-networks.join-school.school-code-confirm-instructions"
          currentStep={2}
          headerText="school-networks.join-school.school-code-confirm"
          maxSteps={4}
        />
        <View style={styles.box}>
          <RegularText>{route.params?.school.name}</RegularText>
        </View>
      </View>
      <Button branded onPress={handleOnPress}>
        {i18n.t('legal.confirm')}
      </Button>
    </Screen>
  );
}

const styles = StyleSheet.create({
  box: {
    alignContent: 'center',
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 8,
    justifyContent: 'center',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
  },
  container: {
    flex: 1,
  },
});

export default ConfirmSchoolScreen;
