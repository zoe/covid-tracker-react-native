import { ProgressHeader } from '@covid/components/ProgressHeader';
import { Screen } from '@covid/components/Screen';
import { selectPatientsJoinedGroups } from '@covid/core/schools/Schools.slice';
import { TRootState } from '@covid/core/state/root';
import i18n from '@covid/locale/i18n';
import { TScreenParamList } from '@covid/routes/types';
import { RouteProp } from '@react-navigation/native';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { SchoolForm } from './forms';
import { SelectedSchool } from './partials';

interface IProps {
  route: RouteProp<TScreenParamList, 'JoinSchool'>;
}

function JoinSchoolScreen({ route }: IProps) {
  const currentPatient = route.params?.patientData?.patientState;

  const currentJoinedGroup = useSelector((state: TRootState) =>
    selectPatientsJoinedGroups(state, currentPatient?.patientId, false),
  );

  return (
    <Screen simpleCallout profile={currentPatient?.profile} testID="join-school-screen">
      {currentJoinedGroup ? (
        <SelectedSchool
          hasBubbles
          body={i18n.t('school-networks.join-school.more-information')}
          currentJoinedGroup={currentJoinedGroup}
          currentPatient={currentPatient}
          link={i18n.t('school-networks.join-school.school-url')}
          linkLabel={i18n.t('school-networks.join-school.school-url-label')}
          organisation="School"
          removeText={i18n.t('school-networks.join-school.remove')}
          title={i18n.t('school-networks.join-school.school-network-header')}
        />
      ) : (
        <>
          <ProgressHeader
            currentStep={1}
            description={i18n.t('school-networks.join-school.school-code-instructions')}
            maxSteps={4}
            title={i18n.t('school-networks.join-school.school-code-title')}
          />
          <SchoolForm patientData={route.params?.patientData} />
        </>
      )}
    </Screen>
  );
}

export default JoinSchoolScreen;
