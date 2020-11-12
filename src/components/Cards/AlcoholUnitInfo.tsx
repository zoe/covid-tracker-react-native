import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

import { colors } from '@theme';
import { Pint, Shot, SmallGlass, StandardWine, LargeWine, BottleWine } from '@assets/icons/alcohol';
import IInfoCircle from '@assets/icons/I-InfoCircle';
import { RegularText, RegularBoldText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import { isUSCountry } from '@covid/core/localisation/LocalisationService';

interface Props {
  style?: StyleProp<ViewStyle>;
}

interface UnitGuideItem {
  icon?: React.ReactElement;
  title: string;
  volume?: string;
  unit: string;
}

const UNITS_GUIDE = (): UnitGuideItem[] => [
  {
    icon: <Pint />,
    title: i18n.t('diet-study.alcohol-unit-info.pints'),
    volume: i18n.t('diet-study.alcohol-unit-info.pints-volume'),
    unit: i18n.t('diet-study.alcohol-unit-info.pints-units'),
  },
  {
    icon: <Shot />,
    title: i18n.t('diet-study.alcohol-unit-info.shots'),
    volume: i18n.t('diet-study.alcohol-unit-info.shots-volume'),
    unit: i18n.t('diet-study.alcohol-unit-info.shots-units'),
  },
  {
    icon: <SmallGlass />,
    title: i18n.t('diet-study.alcohol-unit-info.small-glass'),
    volume: i18n.t('diet-study.alcohol-unit-info.small-glass-volume'),
    unit: i18n.t('diet-study.alcohol-unit-info.small-glass-units'),
  },
  {
    icon: <StandardWine />,
    title: i18n.t('diet-study.alcohol-unit-info.standard-glass'),
    volume: i18n.t('diet-study.alcohol-unit-info.standard-glass-volume'),
    unit: i18n.t('diet-study.alcohol-unit-info.standard-glass-units'),
  },
  {
    icon: <LargeWine />,
    title: i18n.t('diet-study.alcohol-unit-info.large-glass'),
    volume: i18n.t('diet-study.alcohol-unit-info.large-glass-volume'),
    unit: i18n.t('diet-study.alcohol-unit-info.large-glass-units'),
  },
  {
    icon: <BottleWine />,
    title: i18n.t('diet-study.alcohol-unit-info.bottle-wine'),
    volume: i18n.t('diet-study.alcohol-unit-info.bottle-wine-volume'),
    unit: i18n.t('diet-study.alcohol-unit-info.bottle-wine-units'),
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
        <RegularBoldText style={itemStyles.unitLabel}>{item.unit}</RegularBoldText>
      </View>
    </>
  );
};

export const AlcoholUnitInfo: React.FC<Props> = ({ style }) => {
  const unitsGuide = UNITS_GUIDE();
  if (isUSCountry()) {
    unitsGuide.push({
      icon: <Pint />,
      title: i18n.t('diet-study.alcohol-unit-info.malt-liquor'),
      volume: i18n.t('diet-study.alcohol-unit-info.malt-liquor-volume'),
      unit: i18n.t('diet-study.alcohol-unit-info.malt-liquor-units'),
    });
  }

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
        {unitsGuide.map((item) => (
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
