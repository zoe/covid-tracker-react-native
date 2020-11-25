import React from 'react';
import { Share, View } from 'react-native';

import { SubscribedSchoolStats, SubscribedSchoolGroupStats } from '@covid/core/schools/Schools.dto';

import { ShareButton } from '../../Buttons';
import { Text } from '../../typography';

import SchoolHeader from './SchoolHeader';
import SchoolStats from './SchoolStats';

interface IProps {
  school: SubscribedSchoolStats;
}

function SchoolNetworksCard({ school }: IProps) {
  const share = async () => {
    try {
      await Share.share({
        message: 'https://covid.joinzoe.com/schools',
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const getSchoolTotals = () => {
    const t = school.groups.reduce(
      (acc, cur) => {
        return { bubbleSize: acc.bubbleSize + cur.size, reported: acc.reported + cur.daily_reported_symptoms };
      },
      { bubbleSize: 0, reported: 0 }
    );
    return t;
  };

  const schoolTotals = getSchoolTotals();

  return (
    <View>
      <SchoolHeader schoolName={school.name} />
      <SchoolStats active size={schoolTotals.bubbleSize} reported={schoolTotals.reported} total={school.size} />
      {school.groups.map((group, index) => {
        const isLast = index === school.groups.length - 1;
        return (
          <>
            <SchoolStats
              active={group.status === 'active'}
              bubbleName={group.name}
              size={group.size}
              isLast={isLast}
              key={group.id}
              reported={Math.round(Math.random() * 1)}
              total={Math.round(Math.random() * 20)}
            />
          </>
        );
      })}
      <View>
        <ShareButton label="Share this with someone" onPress={share} />
      </View>
    </View>
  );
}

export default SchoolNetworksCard;