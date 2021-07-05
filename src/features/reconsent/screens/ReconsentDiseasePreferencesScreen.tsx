import { Brain } from '@assets/icons/svgIcons';
import { Text } from '@covid/components';
import DiseaseCard from '@covid/features/reconsent/components/DiseaseCard';
import InfoBox from '@covid/features/reconsent/components/InfoBox';
import ReconsentScreen from '@covid/features/reconsent/components/ReconsentScreen';
import { TDisease, TDiseasePreference, TDiseasePreferencesData } from '@covid/features/reconsent/types';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { grid } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

// TODO: Replace icons

const initialDiseases: TDiseasePreference[] = [
  {
    IconComponent: Brain,
    name: 'dementia',
  },
  {
    IconComponent: Brain,
    name: 'cardiovascular_diseases',
  },
  {
    IconComponent: Brain,
    name: 'cancer',
  },
  {
    IconComponent: Brain,
    name: 'joint_and_bone_diseases',
  },
  {
    IconComponent: Brain,
    name: 'mental_health',
  },
];

const extendedDiseases: TDiseasePreference[] = [
  {
    IconComponent: Brain,
    name: 'womens_health',
  },
  {
    IconComponent: Brain,
    name: 'vision_and_hearing_conditions',
  },
  {
    IconComponent: Brain,
    name: 'autoimmune_conditions',
  },
  {
    IconComponent: Brain,
    name: 'skin_conditions',
  },
  {
    IconComponent: Brain,
    name: 'lung_diseases',
  },
  {
    IconComponent: Brain,
    name: 'neurological_conditions',
  },
];

export default function ReconsentDiseasePreferencesScreen() {
  const [showExtendedList, setShowExtendedList] = React.useState<boolean>(false);
  const [diseasePreferences, setDiseasePreferences] = React.useState<TDiseasePreferencesData>({});

  const toggleDisease = (disease: TDisease) => {
    setDiseasePreferences((prevState) => ({ ...prevState, [disease]: !prevState[disease] }));
  };

  const onNextClick = () => {
    NavigatorService.navigate('ReconsentDiseaseSummary', { diseasePreferences });
  };

  const renderItem = ({ item }: { item: TDiseasePreference }) => {
    return (
      <DiseaseCard
        description={i18n.t(`disease-cards.${item.name}.description`)}
        IconComponent={item.IconComponent}
        key={item.name}
        onPressHandler={() => toggleDisease(item.name)}
        style={{ marginBottom: grid.xxl }}
        title={i18n.t(`disease-cards.${item.name}.name`)}
      />
    );
  };

  const ShowMore = () => (
    <Pressable onPress={() => setShowExtendedList(true)}>
      <Text rhythm={16} style={styles.showMore} textClass="pMedium">
        {i18n.t('reconsent.disease-preferences.show-more')}
      </Text>
    </Pressable>
  );

  return (
    <ReconsentScreen
      activeDot={1}
      buttonOnPress={onNextClick}
      // buttonOnPress={() => NavigatorService.navigate('ReconsentDiseaseSummary')}
      buttonTitle={i18n.t('navigation.next')}
    >
      <Text rhythm={24} textAlign="center" textClass="h2Light">
        {i18n.t('reconsent.disease-preferences.title')}
      </Text>
      <Text rhythm={16} style={styles.subtitle} textAlign="center" textClass="pLight">
        {i18n.t('reconsent.disease-preferences.subtitle')}
      </Text>
      <FlatList
        data={showExtendedList ? initialDiseases.concat(extendedDiseases) : initialDiseases}
        keyExtractor={(disease: TDiseasePreference) => disease.name}
        ListFooterComponent={ShowMore}
        ListFooterComponentStyle={showExtendedList ? { display: 'none' } : null}
        renderItem={renderItem}
        style={{ overflow: 'visible' }}
      />
      <View style={styles.infoBox}>
        <InfoBox text={i18n.t('reconsent.disease-preferences.how-data-used')} />
      </View>
    </ReconsentScreen>
  );
}

const styles = StyleSheet.create({
  center: {
    textAlign: 'center',
  },
  infoBox: {
    marginBottom: grid.xl,
    marginTop: grid.s,
  },
  page: {
    backgroundColor: colors.backgroundPrimary,
  },
  showMore: {
    color: colors.purple,
    marginTop: grid.m,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  subtitle: {
    color: colors.secondary,
  },
});
