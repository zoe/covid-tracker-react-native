import React from 'react';
import { Linking } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { View } from 'native-base';

import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { ClickableText, HeaderText, RegularText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import patientCoordinator from '@covid/core/patient/PatientCoordinator';
import { Coordinator } from '@covid/core/Coordinator';
import editProfileCoordinator from '@covid/features/multi-profile/edit-profile/EditProfileCoordinator';
import ProgressStatus from '@covid/components/ProgressStatus';
import { ScreenParamList } from '@covid/features';
import { BrandedButton } from '@covid/components';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'NHSDetails'>;
  route: RouteProp<ScreenParamList, 'NHSDetails'>;
};

export const NHSDetailsScreen: React.FC<Props> = (props: Props) => {
  const coordinator: Coordinator = props.route.params.editing ? editProfileCoordinator : patientCoordinator;

  const goNext = () => {
    coordinator.gotoNextScreen(props.route.name);
  };

  const openUrl = (link: string) => {
    Linking.openURL(link);
  };

  const currentPatient = coordinator.patientData.patientState;

  return (
    <Screen profile={currentPatient.profile} navigation={props.navigation}>
      <Header>
        <HeaderText>{i18n.t('nhs-study-questions.title')}</HeaderText>
      </Header>

      <ProgressBlock>
        <ProgressStatus step={3} maxSteps={6} />
      </ProgressBlock>

      <View style={{ paddingHorizontal: 16 }}>
        <RegularText style={{ marginTop: 32, marginBottom: 16 }}>{i18n.t('nhs-study-questions.text-1')}</RegularText>

        <RegularText style={{ marginVertical: 16 }}>{i18n.t('nhs-study-questions.text-2')}</RegularText>

        <RegularText style={{ marginVertical: 16 }}>
          <RegularText>{i18n.t('nhs-study-questions.text-3')}</RegularText>
          <ClickableText onPress={() => openUrl('https://covid.joinzoe.com/passt')}>
            {i18n.t('nhs-study-questions.text-link')}
          </ClickableText>
        </RegularText>
      </View>

      <BrandedButton style={{ marginVertical: 16 }} onPress={goNext}>
        {i18n.t('nhs-study-intro.next')}
      </BrandedButton>
    </Screen>
  );
};
