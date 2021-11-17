import { TCovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { CovidTestRow } from '@covid/features/covid-tests/components/CovidTestRow';
import { colors } from '@theme';
import * as React from 'react';
import { FlatList } from 'react-native';

export interface ICovidListByTypeProps {
  covidTests: TCovidTest[];
}

export function CovidListByType(props: ICovidListByTypeProps) {
  const renderItem = ({ item, index }: { item: TCovidTest; index: number }) => {
    return <CovidTestRow item={item} key={item.id} testID={`covid-test-row-${item.mechanism}-${index}`} />;
  };

  return (
    <FlatList
      nestedScrollEnabled
      scrollEnabled
      contentContainerStyle={{ backgroundColor: colors.backgroundPrimary }}
      data={props.covidTests}
      keyExtractor={(test: TCovidTest, index) => `${test.id}-${index}`}
      renderItem={renderItem}
    />
  );
}
