import { BrandedButton } from '@covid/components';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { ClickableText, HeaderText, RegularText } from '@covid/components/Text';
import { Coordinator } from '@covid/core/Coordinator';
import { patientCoordinator } from '@covid/core/patient/PatientCoordinator';
import { ScreenParamList } from '@covid/features';
import { editProfileCoordinator } from '@covid/features/multi-profile/edit-profile/EditProfileCoordinator';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { Linking, View } from 'react-native';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'NHSDetails'>;
  route: RouteProp<ScreenParamList, 'NHSDetails'>;
};

export const NHSDetailsScreen: React.FC<Props> = (props: Props) => {
  const coordinator: Coordinator = props.route.params?.editing ? editProfileCoordinator : patientCoordinator;

  const goNext = () => {
    coordinator.gotoNextScreen(props.route.name);
  };

  const openUrl = (link: string) => {
    Linking.openURL(link);
  };

  return (
    <Screen navigation={props.navigation} profile={coordinator.patientData?.patientState?.profile}>
      <Header>
        <HeaderText>{i18n.t('nhs-study-questions.title')}</HeaderText>
      </Header>

      <ProgressBlock>
        <ProgressStatus maxSteps={6} step={3} />
      </ProgressBlock>

      <View style={{ paddingHorizontal: 16 }}>
        <RegularText style={{ marginBottom: 16, marginTop: 32 }}>{i18n.t('nhs-study-questions.text-1')}</RegularText>

        <RegularText style={{ marginVertical: 16 }}>{i18n.t('nhs-study-questions.text-2')}</RegularText>

        <RegularText style={{ marginVertical: 16 }}>
          <RegularText>{i18n.t('nhs-study-questions.text-3')}</RegularText>
          <ClickableText onPress={() => openUrl('https://covid.joinzoe.com/passt')}>
            {i18n.t('nhs-study-questions.text-link')}
          </ClickableText>
        </RegularText>
      </View>

      <BrandedButton onPress={goNext} style={{ marginVertical: 16 }}>
        {i18n.t('nhs-study-intro.next')}
      </BrandedButton>
    </Screen>
  );
};
