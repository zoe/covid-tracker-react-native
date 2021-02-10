import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import Screen from '@covid/components/Screen';
import { SchoolModel } from '@covid/core/schools/Schools.dto';
import { ISchoolService } from '@covid/core/schools/SchoolService';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import { RootState } from '@covid/core/state/root';
import { selectAllJoinedGroups, selectPatientsJoinedGroups } from '@covid/core/schools/Schools.slice';

import { UniversityForm } from './forms';
import { JoinHeader, SelectedSchool } from './partials';

interface IProps {
  navigation: StackNavigationProp<ScreenParamList, 'ConfirmSchool'>;
  route: RouteProp<ScreenParamList, 'ConfirmSchool'>;
}

function JoinHigherEducationScreen({ navigation, route }: IProps) {
  const [schools, setSchools] = useState<SchoolModel[]>([]);
  const service = useInjection<ISchoolService>(Services.SchoolService);
  const { patientData } = route.params;
  const currentJoinedGroup = useSelector((state: RootState) =>
    selectPatientsJoinedGroups(state, patientData.patientId, true)
  );

  useEffect(() => {
    (async () => {
      const schools = await service.getUniversities();
      setSchools(schools);
    })();
  }, []);

  return (
    <Screen profile={patientData.patientState.profile} navigation={navigation}>
      {currentJoinedGroup ? (
        <SelectedSchool
          title="school-networks.join-school.university-network-header"
          currentJoinedGroup={currentJoinedGroup}
          currentPatient={patientData.patientState}
          removeText="school-networks.join-school.removeHigherEducation"
        />
      ) : (
        <>
          <JoinHeader
            headerText="school-networks.join-school.title-higher-education"
            bodyText="school-networks.join-school.description-higher-education"
            currentStep={1}
            maxSteps={1}
          />
          <UniversityForm currentJoinedGroup={currentJoinedGroup} schools={schools} />
        </>
      )}
    </Screen>
  );
}

export default JoinHigherEducationScreen;
