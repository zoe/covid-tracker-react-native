import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { HeaderText, RegularText, SecondaryText } from '@covid/components/Text';
import Screen, { FieldWrapper, Header } from '@covid/components/Screen';
import { BigButton } from '@covid/components/BigButton';
import i18n from '@covid/locale/i18n';
import { ICoreService } from '@covid/core/user/UserService';
import appCoordinator from '@covid/features/AppCoordinator';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';

import { ScreenParamList } from '../ScreenParamList';

type RenderProps = {
  navigation: StackNavigationProp<ScreenParamList, 'ArchiveReason'>;
  route: RouteProp<ScreenParamList, 'ArchiveReason'>;
};

export const ArchiveReasonScreen: React.FC<RenderProps> = (props) => {
  const userService = useInjection<ICoreService>(Services.User);
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

    userService.updatePatient(props.route.params.profileId, infos).then((response) => {
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
          <FieldWrapper key={i}>
            <BigButton onPress={() => submitReason(reason.value)}>
              <RegularText>{reason.text}</RegularText>
            </BigButton>
          </FieldWrapper>
        );
      })}
    </Screen>
  );
};
