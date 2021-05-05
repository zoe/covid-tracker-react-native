import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { ISubscribedSchoolStats, ISubscribedSchoolGroupStats } from '@covid/core/schools/Schools.dto';

import Card from './Card';
import { SContainerView } from './styles';

type Props = {
  schoolGroups: ISubscribedSchoolGroupStats[];
  style?: StyleProp<ViewStyle>;
};

const transformResponseToUIData = (data: ISubscribedSchoolGroupStats[]): ISubscribedSchoolStats[] => {
  return data.reduce((initial: ISubscribedSchoolStats[], group): ISubscribedSchoolStats[] => {
    const school = initial.find((school) => school.id === group.school.id);

    if (school) {
      const index = initial.indexOf(school);
      initial[index] = {
        ...school,
        cases: school.cases + group.cases,
        groups: [...school.groups, group],
      };
      return initial;
    } else {
      initial.push({
        id: group.school.id,
        name: group.school.name,
        size: group.school.size,
        cases: group.cases,
        groups: [group],
        higher_education: group.school.higher_education,
      });
      return initial;
    }
  }, []);
};

function SchoolNetworks(props: Props) {
  const data: ISubscribedSchoolStats[] = transformResponseToUIData(props.schoolGroups);
  return (
    <SContainerView style={props.style}>
      {data.map((school) => (school.higher_education ? null : <Card school={school} key={school.id} />))}
    </SContainerView>
  );
}

export default SchoolNetworks;
