import { TCovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { CovidTestRow } from '@covid/features/covid-tests/components/CovidTestRow';
import { colors } from '@theme';
import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';

export interface ICovidListByTypeProps {
  covidTests: TCovidTest[];
}

const keyExtractor = (test: TCovidTest, index: number) => `${test.id}-${index}`;

const renderItem = ({ item, index }: { item: TCovidTest; index: number }) => {
  return <CovidTestRow item={item} key={item.id} testID={`covid-test-row-${item.mechanism}-${index}`} />;
};

export function CovidListByType(props: ICovidListByTypeProps) {
  return (
    <FlatList
      nestedScrollEnabled
      scrollEnabled
      contentContainerStyle={styles.contentContainer}
      data={props.covidTests}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: { backgroundColor: colors.backgroundPrimary },
});
