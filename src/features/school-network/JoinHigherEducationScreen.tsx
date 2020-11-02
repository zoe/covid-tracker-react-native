import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Formik } from 'formik';
import { Form } from 'native-base';
import * as Yup from 'yup';

import { Button } from '@covid/components/Buttons/Button';
import DropdownField from '@covid/components/DropdownField';
import Screen from '@covid/components/Screen';
import { TwoButtonModal } from '@covid/components/TwoButtonModal';
import { SchoolModel } from '@covid/core/schools/Schools.dto';
import { ISchoolService } from '@covid/core/schools/SchoolService';
import schoolNetworkCoordinator from '@covid/features/school-network/SchoolNetworkCoordinator';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import { RootState } from '@covid/core/state/root';
import { selectJoinedGroups, selectPreviouslyJoinedGroups } from '@covid/core/schools/Schools.slice';

import { JoinHeader, RemoveSchoolButton, SelectedSchool } from './partials';
import { UniversityForm } from './forms';

interface IProps {
  navigation: StackNavigationProp<ScreenParamList, 'ConfirmSchool'>;
  route: RouteProp<ScreenParamList, 'ConfirmSchool'>;
}

function JoinHigherEducationScreen({ navigation, route }: IProps) {
  const [schools, setSchools] = useState<SchoolModel[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const service = useInjection<ISchoolService>(Services.SchoolService);
  const { patientData } = route.params;

  const validationSchema = Yup.object().shape({
    schoolId: Yup.string().required(i18n.t('validation-error-text-required')),
  });
  const previouslyJoinedGroups = useSelector((state: RootState) => selectJoinedGroups(state, true));
  const currentJoinedGroup = useSelector((state: RootState) =>
    selectPreviouslyJoinedGroups(state, patientData.patientId, true)
  );

  const initialValues = {
    schoolId: currentJoinedGroup ? currentJoinedGroup.school.id : '',
  };

  const onRemove = (schoolId: string) => {
    schoolNetworkCoordinator.removePatientFromGroupList(previouslyJoinedGroups!, schoolId, patientData.patientId);
    setModalVisible(false);
    schoolNetworkCoordinator.closeFlow();
  };

  useEffect(() => {
    (async () => {
      const schools = await service.getSchools();
      setSchools(schools.filter((s) => s.higher_education === true));
    })();
  }, []);

  return (
    <Screen profile={patientData.patientState.profile} navigation={navigation}>
      {currentJoinedGroup ? (
        <SelectedSchool
          title="school-networks.join-school.university-network-header"
          body="school-networks.join-school.university-network-body"
          organisation="University"
          currentJoinedGroup={currentJoinedGroup}
          previouslyJoinedGroups={previouslyJoinedGroups}
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
