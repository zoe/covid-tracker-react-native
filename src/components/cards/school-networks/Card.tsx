import { ShareButton } from '@covid/components/buttons';
import { ISubscribedSchoolStats } from '@covid/core/schools/Schools.dto';
import i18n from '@covid/locale/i18n';
import * as React from 'react';
import { Share, View } from 'react-native';

import SchoolHeader from './SchoolHeader';
import SchoolStats from './SchoolStats';

interface IProps {
  school: ISubscribedSchoolStats;
}

function SchoolNetworksCard({ school }: IProps) {
  const share = async () => {
    try {
      await Share.share({
        message: 'https://covid.joinzoe.com/schools',
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const getSchoolTotals = () => {
    const t = school.groups.reduce(
      (acc, cur) => {
        return { bubbleSize: acc.bubbleSize + cur.size, reported: acc.reported + cur.daily_reported_symptoms };
      },
      { bubbleSize: 0, reported: 0 },
    );
    return t;
  };

  const schoolTotals = getSchoolTotals();

  return (
    <View>
      <SchoolHeader schoolName={school.name} />
      <SchoolStats active reported={schoolTotals.reported} size={schoolTotals.bubbleSize} total={school.size} />
      {school.groups.map((group, index) => {
        const isLast = index === school.groups.length - 1;
        return (
          <SchoolStats
            active={group.status === 'active'}
            bubbleName={group.name}
            daily={group.daily_assessments}
            isLast={isLast}
            // eslint-disable-next-line react/no-array-index-key
            key={`${group.id}-${index}`}
            reported={group.daily_reported_symptoms}
            size={group.size}
            total={group.max_size}
          />
        );
      })}
      <View>
        <ShareButton label={i18n.t('generic.share-this-with-someone')} onPress={share} />
      </View>
    </View>
  );
}

export default SchoolNetworksCard;
