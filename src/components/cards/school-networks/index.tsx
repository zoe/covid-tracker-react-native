import { ISubscribedSchoolGroupStats, ISubscribedSchoolStats } from '@covid/core/schools/Schools.dto';
import React from 'react';

import Card from './Card';
import { SContainerView } from './styles';

type Props = {
  schoolGroups: ISubscribedSchoolGroupStats[];
};

const TransformResponseToUIData = (data: ISubscribedSchoolGroupStats[]): ISubscribedSchoolStats[] => {
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
};

function SchoolNetworks(props: Props) {
  const data: ISubscribedSchoolStats[] = TransformResponseToUIData(props.schoolGroups);
  return (
    <SContainerView>
      {data.map((school, index) => {
        return school.higher_education ? null : <Card key={school.id} school={school} />;
      })}
    </SContainerView>
  );
}

export default SchoolNetworks;
