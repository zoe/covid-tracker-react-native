import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

import { colors } from '@theme';
import { Pint, Shot, SmallGlass, StandardWine, LargeWine, BottleWine } from '@assets/icons/alcohol';
import IInfoCircle from '@assets/icons/I-InfoCircle';
import { RegularText, RegularBoldText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';

interface Props {
  style?: StyleProp<ViewStyle>;
}

interface UnitGuideItem {
  icon?: React.ReactElement;
  title: string;
  volume?: string;
  unit: number;
}

const UNITS_GUIDE = (): UnitGuideItem[] => [
  {
    icon: <Pint />,
    title: i18n.t('diet-study.alcohol-unit-info.pints'),
    unit: 2,
  },
  {
    icon: <Shot />,
    title: i18n.t('diet-study.alcohol-unit-info.shots'),
    volume: '25ml',
    unit: 1,
  },
  {
    icon: <SmallGlass />,
    title: i18n.t('diet-study.alcohol-unit-info.small-glass'),
    unit: 1,
  },
  {
    icon: <StandardWine />,
    title: i18n.t('diet-study.alcohol-unit-info.standard-glass'),
    volume: '175ml',
    unit: 2,
  },
  {
    icon: <LargeWine />,
    title: i18n.t('diet-study.alcohol-unit-info.large-glass'),
    volume: '250ml',
    unit: 3,
  },
  {
    icon: <BottleWine />,
    title: i18n.t('diet-study.alcohol-unit-info.bottle-wine'),
    volume: '75cl',
    unit: 9,
  },
];

interface UnitInfoItemProps {
  item: UnitGuideItem;
}

const UnitInfoItem: React.FC<UnitInfoItemProps> = ({ item }) => {
  return (
    <>
      <View style={itemStyles.container}>
        <View style={itemStyles.icon}>{item.icon}</View>
        <RegularText style={itemStyles.primaryLabel}>{item.title}</RegularText>
        {item.volume && <RegularText style={itemStyles.volumeLabel}>({item.volume})</RegularText>}
      </View>
      <View style={{ paddingLeft: 32, paddingBottom: 8 }}>
        {item.unit === 1 && <RegularBoldText style={itemStyles.unitLabel}>{item.unit} unit</RegularBoldText>}
        {item.unit > 1 && <RegularBoldText style={itemStyles.unitLabel}>{item.unit} units</RegularBoldText>}
      </View>
    </>
  );
};

export const AlcoholUnitInfo: React.FC<Props> = ({ style }) => {
  return (
    <View style={style}>
      <View style={styles.infoIcon}>
        <IInfoCircle />
      </View>
      <View style={styles.container}>
        <RegularText style={styles.description}>
          {i18n.t('diet-study.alcohol-unit-info.label-1')} {i18n.t('diet-study.alcohol-unit-info.label-2')}
        </RegularText>
        <View style={{ height: 16 }} />
        {UNITS_GUIDE().map((item) => (
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
  volumeLabel: {
    marginRight: 4,
  },
  description: {
    marginBottom: 16,
  },
  unitLabel: {
    color: colors.textDark,
  },
});
