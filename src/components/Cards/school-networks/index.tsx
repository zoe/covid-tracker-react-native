import React from 'react';

import { SubscribedSchoolStats, SubscribedSchoolGroupStats } from '@covid/core/schools/Schools.dto';

import Card from './Card';
import { SContainerView } from './styles';

type Props = {
  schoolGroups: SubscribedSchoolGroupStats[];
};

const TransformResponseToUIData = (data: SubscribedSchoolGroupStats[]): SubscribedSchoolStats[] => {
  return data.reduce((initial: SubscribedSchoolStats[], group): SubscribedSchoolStats[] => {
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
  const data: SubscribedSchoolStats[] = TransformResponseToUIData(props.schoolGroups);
  return (
    <SContainerView>
      {data.map((school, index) => {
        return school.higher_education ? null : <Card school={school} key={index} />;
      })}
    </SContainerView>
  );
}

export default SchoolNetworks;
