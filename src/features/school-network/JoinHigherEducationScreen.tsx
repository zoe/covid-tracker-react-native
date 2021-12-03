import { ProgressHeader } from '@covid/components/ProgressHeader';
import { Screen } from '@covid/components/Screen';
import { ISchoolModel } from '@covid/core/schools/Schools.dto';
import { selectPatientsJoinedGroups } from '@covid/core/schools/Schools.slice';
import { schoolService } from '@covid/core/schools/SchoolService';
import { TRootState } from '@covid/core/state/root';
import i18n from '@covid/locale/i18n';
import { TScreenParamList } from '@covid/routes/types';
import { RouteProp } from '@react-navigation/native';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { UniversityForm } from './forms';
import { SelectedSchool } from './partials';

interface IProps {
  route: RouteProp<TScreenParamList, 'ConfirmSchool'>;
}

export default function JoinHigherEducationScreen({ route }: IProps) {
  const [schools, setSchools] = React.useState<ISchoolModel[]>([]);
  const currentJoinedGroup = useSelector((state: TRootState) =>
    selectPatientsJoinedGroups(state, route.params?.patientData?.patientId, true),
  );

  React.useEffect(() => {
    (async () => {
      const schoolsUnfiltered = await schoolService.getSchools();
      setSchools(schoolsUnfiltered.filter((s) => s.higher_education === true));
    })();
  }, []);

  return (
    <Screen profile={route.params?.patientData?.patientState?.profile} testID="join-higher-education-screen">
      {currentJoinedGroup ? (
        <SelectedSchool
          currentJoinedGroup={currentJoinedGroup}
          currentPatient={route.params?.patientData?.patientState}
          removeText={i18n.t('school-networks.join-school.removeHigherEducation')}
          title={i18n.t('school-networks.join-school.university-network-header')}
        />
      ) : (
        <>
          <ProgressHeader
            currentStep={0}
            description={i18n.t('school-networks.join-school.description-higher-education')}
            maxSteps={1}
            title={i18n.t('school-networks.join-school.title-higher-education')}
          />
          <UniversityForm currentJoinedGroup={currentJoinedGroup} schools={schools} />
        </>
      )}
    </Screen>
  );
}
