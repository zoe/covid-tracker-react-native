import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { Button } from '@covid/components/buttons/Button';
import Screen from '@covid/components/Screen';
import { RegularText } from '@covid/components/Text';
import schoolNetworkCoordinator from '@covid/features/school-network/SchoolNetworkCoordinator';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { colors } from '@covid/theme';

import { JoinHeader } from './partials';

interface IProps {
  navigation: StackNavigationProp<ScreenParamList, 'ConfirmSchool'>;
  route: RouteProp<ScreenParamList, 'ConfirmSchool'>;
}

function ConfirmSchoolScreen({ route, navigation }: IProps) {
  const { patientData, school } = route.params;

  const handleOnPress = async () => {
    await schoolNetworkCoordinator.setSelectedSchool(school);
    schoolNetworkCoordinator.goToJoinGroup();
  };

  return (
    <Screen profile={patientData.patientState.profile} navigation={navigation}>
      <View style={styles.container}>
        <JoinHeader
          headerText="school-networks.join-school.school-code-confirm"
          bodyText="school-networks.join-school.school-code-confirm-instructions"
          currentStep={2}
          maxSteps={4}
        />
        <View style={styles.box}>
          <RegularText>{school.name}</RegularText>
        </View>
      </View>
      <Button onPress={handleOnPress} branded>
        {i18n.t('legal.confirm')}
      </Button>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    alignContent: 'center',
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 16,
    marginHorizontal: 16,
    padding: 16,
  },
});

export default ConfirmSchoolScreen;
