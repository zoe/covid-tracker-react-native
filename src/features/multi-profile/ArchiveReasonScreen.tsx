import { Screen } from '@covid/components/Screen';
import { SelectorButton } from '@covid/components/SelectorButton';
import { HeaderText, SecondaryText } from '@covid/components/Text';
import { patientService } from '@covid/core/patient/PatientService';
import { appCoordinator } from '@covid/features/AppCoordinator';
import i18n from '@covid/locale/i18n';
import { TScreenParamList } from '@covid/routes/types';
import { styling } from '@covid/themes';
import { RouteProp } from '@react-navigation/native';
import * as React from 'react';

type TProps = {
  route: RouteProp<TScreenParamList, 'ArchiveReason'>;
};

export const ArchiveReasonScreen: React.FC<TProps> = (props) => {
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

    patientService.updatePatientInfo(props.route.params?.patientId, infos).then(() => {
      appCoordinator.gotoNextScreen(props.route.name);
    });
  }

  return (
    <Screen testID="archive-reason-screen">
      <HeaderText>{i18n.t('archive-reason.title')}</HeaderText>
      <SecondaryText style={styling.marginVertical}>{i18n.t('archive-reason.text')}</SecondaryText>

      {reasons.map((reason, i) => {
        return (
          <SelectorButton
            // eslint-disable-next-line react/no-array-index-key
            key={`archive-reason-${i}`}
            onPress={() => submitReason(reason.value)}
            style={styling.marginTop}
            text={reason.text}
          />
        );
      })}
    </Screen>
  );
};
