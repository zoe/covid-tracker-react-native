import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { colors } from '@theme';
import { Pint, Shot, SmallGlass, StandardWine, LargeWine, BottleWine } from '@assets/icons/alcohol';
import InfoCircle from '@assets/icons/InfoCircle';
import { RegularText, RegularBoldText } from '@covid/components/Text';

interface Props {}

interface UnitGuideItem {
  icon?: React.ReactElement;
  title: string;
  volume?: string;
  unit: string;
}

const UNITS_GUIDE: UnitGuideItem[] = [
  {
    icon: <Pint />,
    title: 'Pint or can of beer/lager/cider',
    unit: '2',
  },
  {
    icon: <Shot />,
    title: 'Single shot of spirits',
    volume: '25ml',
    unit: '1',
  },
  {
    icon: <SmallGlass />,
    title: 'Small glass of fortified wine',
    unit: '1',
  },
  {
    icon: <StandardWine />,
    title: 'Standard glass of wine',
    volume: '125ml',
    unit: '2',
  },
  {
    icon: <LargeWine />,
    title: 'Large glass of wine',
    volume: '250ml',
    unit: '3',
  },
  {
    icon: <BottleWine />,
    title: 'Bottle of wine',
    volume: '75cl',
    unit: '3',
  },
];

interface UnitInfoItemProps {
  item: UnitGuideItem;
}

const UnitInfoItem: React.FC<UnitInfoItemProps> = ({ item }) => {
  return (
    <View style={itemStyles.container}>
      <View style={itemStyles.icon}>{item.icon}</View>
      <RegularText style={itemStyles.primaryLabel}>{item.title}</RegularText>
      {item.volume && <RegularText style={itemStyles.volumneLabel}>({item.volume})</RegularText>}
      <RegularBoldText style={itemStyles.unitLabel}>{item.unit} unit</RegularBoldText>
    </View>
  );
};

export const AlcoholUnitInfo: React.FC<Props> = () => {
  return (
    <View>
      <View style={styles.infoIcon}>
        <InfoCircle />
      </View>
      <View style={styles.container}>
        <RegularText style={styles.description}>A drink is defined as one unit of alcohol.</RegularText>
        <RegularText style={styles.description}>Typical units in common alcoholic beverages:</RegularText>
        <View style={{ height: 16 }} />
        {UNITS_GUIDE.map((item) => (
          <UnitInfoItem item={item} key={item.title} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoIcon: {
    position: 'absolute',
    zIndex: 1,
    top: -10,
    right: -10,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowRadius: 30,
    shadowOpacity: 0.2,
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
  },
  description: {
    color: colors.textDark,
  },
});

const itemStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  icon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    marginRight: 8,
    alignItems: 'center',
  },
  primaryLabel: {
    marginRight: 4,
    color: colors.textDark,
  },
  volumneLabel: {
    marginRight: 4,
  },
  description: {
    marginBottom: 16,
  },
  unitLabel: {
    color: colors.textDark,
  },
});
