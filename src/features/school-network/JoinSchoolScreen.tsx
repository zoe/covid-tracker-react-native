import Screen from '@covid/components/Screen';
import { selectPatientsJoinedGroups } from '@covid/core/schools/Schools.slice';
import { RootState } from '@covid/core/state/root';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { SchoolForm } from './forms';
import { JoinHeader, SelectedSchool } from './partials';

interface IProps {
  navigation: StackNavigationProp<ScreenParamList, 'JoinSchool'>;
  route: RouteProp<ScreenParamList, 'JoinSchool'>;
}

function JoinSchoolScreen({ route, navigation }: IProps) {
  const currentPatient = route.params?.patientData?.patientState;

  const currentJoinedGroup = useSelector((state: RootState) =>
    selectPatientsJoinedGroups(state, currentPatient?.patientId, false),
  );

  return (
    <Screen simpleCallout navigation={navigation} profile={currentPatient?.profile} testID="join-school-screen">
      {currentJoinedGroup ? (
        <SelectedSchool
          hasBubbles
          body="school-networks.join-school.more-information"
          currentJoinedGroup={currentJoinedGroup}
          currentPatient={currentPatient}
          link="school-networks.join-school.school-url"
          linkLabel="school-networks.join-school.school-url-label"
          organisation="School"
          removeText="school-networks.join-school.remove"
          title="school-networks.join-school.school-network-header"
        />
      ) : (
        <>
          <JoinHeader
            bodyText="school-networks.join-school.school-code-instructions"
            currentStep={1}
            headerText="school-networks.join-school.school-code-title"
            maxSteps={4}
          />
          <SchoolForm patientData={route.params?.patientData} />
        </>
      )}
    </Screen>
  );
}

export default JoinSchoolScreen;
