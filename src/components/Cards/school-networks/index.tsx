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
      });
      return initial;
    }
  }, []);
};

function SchoolNetworks(props: Props) {
  const data: SubscribedSchoolStats[] = TransformResponseToUIData(props.schoolGroups);

  return (
    <SContainerView>
      {data.map((school) => {
        return <Card school={school} key={school.id} />;
      })}
    </SContainerView>
  );
}

export default SchoolNetworks;
