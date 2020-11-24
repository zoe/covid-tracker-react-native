import React from 'react';
import { View } from 'react-native';

import { SubscribedSchoolStats, SubscribedSchoolGroupStats } from '@covid/core/schools/Schools.dto';

import SchoolHeader from './SchoolHeader';
import SchoolStats from './SchoolStats';

interface IProps {
  schoolName: string;
  schoolGroups: SubscribedSchoolGroupStats[];
}

function SchoolNetworksCard({ schoolName }: IProps) {
  return (
    <View>
      <SchoolHeader schoolName={schoolName} />
      <SchoolStats />
      <SchoolStats />
    </View>
  );
}

export default SchoolNetworksCard;
