import React from 'react';
import { useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { ScreenParamList } from '@covid/features/ScreenParamList';
import Screen from '@covid/components/Screen';
import { RootState } from '@covid/core/state/root';
import { selectJoinedGroups, selectPreviouslyJoinedGroups } from '@covid/core/schools/Schools.slice';

import { JoinHeader, SelectedSchool } from './partials';
import { SchoolForm } from './forms';

interface IProps {
  navigation: StackNavigationProp<ScreenParamList, 'JoinSchool'>;
  route: RouteProp<ScreenParamList, 'JoinSchool'>;
}

function JoinSchoolScreen({ route, navigation }: IProps) {
  const currentPatient = route.params.patientData.patientState;

  const currentJoinedGroup = useSelector((state: RootState) =>
    selectPreviouslyJoinedGroups(state, currentPatient.patientId, false)
  );

  const previouslyJoinedGroups = useSelector((state: RootState) => selectJoinedGroups(state, false));

  return (
    <Screen profile={currentPatient.profile} navigation={navigation} simpleCallout>
      {currentJoinedGroup ? (
        <SelectedSchool
          title="school-networks.join-school.school-network-header"
          body="school-networks.join-school.more-information"
          link="school-networks.join-school.school-url"
          linkLabel="school-networks.join-school.school-url-label"
          organisation="School"
          currentJoinedGroup={currentJoinedGroup}
          previouslyJoinedGroups={previouslyJoinedGroups}
          currentPatient={currentPatient}
          removeText="school-networks.join-school.remove"
          hasBubbles
        />
      ) : (
        <>
          <JoinHeader
            headerText="school-networks.join-school.school-code-title"
            bodyText="school-networks.join-school.school-code-instructions"
            currentStep={1}
            maxSteps={4}
          />
          <SchoolForm patientData={route.params.patientData} />
        </>
      )}
    </Screen>
  );
}

export default JoinSchoolScreen;
