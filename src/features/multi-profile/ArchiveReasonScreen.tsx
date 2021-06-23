import { BigButton } from '@covid/components';
import Screen, { FieldWrapper, Header } from '@covid/components/Screen';
import { HeaderText, RegularText, SecondaryText } from '@covid/components/Text';
import { IPatientService } from '@covid/core/patient/PatientService';
import { ScreenParamList } from '@covid/features';
import appCoordinator from '@covid/features/AppCoordinator';
import i18n from '@covid/locale/i18n';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';

type RenderProps = {
  navigation: StackNavigationProp<ScreenParamList, 'ArchiveReason'>;
  route: RouteProp<ScreenParamList, 'ArchiveReason'>;
};

export const ArchiveReasonScreen: React.FC<RenderProps> = (props) => {
  const patientService = useInjection<IPatientService>(Services.Patient);

  const reasons = [
    {
      text: i18n.t('archive-reason.choice-duplicate-account'),
      value: 'duplicate_account',
    },
    {
      text: i18n.t('archive-reason.choice-no-report'),
      value: 'no_longer_report',
    },
    {
      text: i18n.t('archive-reason.choice-moved-away'),
      value: 'moved_away',
    },
    {
      text: i18n.t('archive-reason.choice-passed-away'),
      value: 'passed_away',
    },
    {
      text: i18n.t('archive-reason.choice-other'),
      value: 'other',
    },
    {
      text: i18n.t('archive-reason.choice-pfnts'),
      value: 'pfnts',
    },
  ];

  function submitReason(reason: string) {
    const infos = {
      archived: true,
      archived_reason: reason,
    };

    patientService.updatePatientInfo(props.route.params.patientId, infos).then((_) => {
      appCoordinator.gotoNextScreen(props.route.name);
    });
  }

  return (
    <Screen navigation={props.navigation}>
      <Header>
        <HeaderText style={{ marginBottom: 12 }}>{i18n.t('archive-reason.title')}</HeaderText>
        <SecondaryText>{i18n.t('archive-reason.text')}</SecondaryText>
      </Header>

      {reasons.map((reason, i) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <FieldWrapper key={`field-wrapper-${i}`}>
            <BigButton onPress={() => submitReason(reason.value)}>
              <RegularText>{reason.text}</RegularText>
            </BigButton>
          </FieldWrapper>
        );
      })}
    </Screen>
  );
};
