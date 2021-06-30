import { ISubscribedSchoolGroupStats, ISubscribedSchoolStats } from '@covid/core/schools/Schools.dto';
import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import Card from './Card';
import { SContainerView } from './styles';

type TProps = {
  schoolGroups: ISubscribedSchoolGroupStats[];
  style?: StyleProp<ViewStyle>;
};

function transformToUIData(schoolGroups: ISubscribedSchoolGroupStats[]): ISubscribedSchoolStats[] {
  return schoolGroups.reduce((initial: ISubscribedSchoolStats[], group): ISubscribedSchoolStats[] => {
    const school = initial.find((school) => school.id === group.school.id);

    if (school) {
      const index = initial.indexOf(school);
      initial[index] = {
        ...school,
        cases: school.cases + group.cases,
        groups: [...school.groups, group],
      };
      return initial;
    }
    initial.push({
      cases: group.cases,
      groups: [group],
      higher_education: group.school.higher_education,
      id: group.school.id,
      name: group.school.name,
      size: group.school.size,
    });
    return initial;
  }, []);
}

export default function SchoolNetworks(props: TProps) {
  const schools: ISubscribedSchoolStats[] = transformToUIData(props.schoolGroups).filter(
    (school) => !school.higher_education,
  );
  return schools?.length ? (
    <SContainerView style={props.style}>
      {schools.map((school) => (
        <Card key={school.id} school={school} />
      ))}
    </SContainerView>
  ) : null;
}
