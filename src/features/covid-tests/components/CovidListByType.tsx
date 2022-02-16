import { TCovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { CovidTestRow } from '@covid/features/covid-tests/components/CovidTestRow';
import * as React from 'react';
import { ScrollView } from 'react-native';

export interface ICovidListByTypeProps {
  covidTests: TCovidTest[];
}

export function CovidListByType(props: ICovidListByTypeProps) {
  const renderItem = (item: TCovidTest, index: number) => {
    return <CovidTestRow item={item} key={item.id} testID={`covid-test-row-${item.mechanism}-${index}`} />;
  };

  return <ScrollView>{props.covidTests.map(renderItem)}</ScrollView>;
}
