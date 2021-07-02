import { Brain } from '@assets/icons/svgIcons';
import { Text } from '@covid/components';
import DiseaseCard from '@covid/features/reconsent/components/DiseaseCard';
import InfoBox from '@covid/features/reconsent/components/InfoBox';
import ReconsentScreen from '@covid/features/reconsent/components/ReconsentScreen';
import { TDiseasePreference } from '@covid/features/reconsent/types';
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
    name: 'cvd',
  },
  {
    IconComponent: Brain,
    name: 'cancer',
  },
  {
    IconComponent: Brain,
    name: 'joint-bone',
  },
  {
    IconComponent: Brain,
    name: 'mental-health',
  },
];

const extendedDiseases: TDiseasePreference[] = [
  {
    IconComponent: Brain,
    name: 'womens-health',
  },
  {
    IconComponent: Brain,
    name: 'vision-hearing',
  },
  {
    IconComponent: Brain,
    name: 'autoimmune',
  },
  {
    IconComponent: Brain,
    name: 'skin',
  },
  {
    IconComponent: Brain,
    name: 'lung',
  },
  {
    IconComponent: Brain,
    name: 'neurological',
  },
];

export default function ReconsentDiseasePreferencesScreen() {
  const [showExtendedList, setShowExtendedList] = React.useState<boolean>(false);
  const addToPreferences = () => {};

  const renderItem = ({ item }: { item: TDiseasePreference }) => {
    return (
      <DiseaseCard
        description={i18n.t(`disease-cards.${item.name}.description`)}
        IconComponent={item.IconComponent}
        key={item.name}
        name={i18n.t(`disease-cards.${item.name}.name`)}
        onPressHandler={addToPreferences}
        style={{ marginBottom: grid.xxl }}
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
      buttonOnPress={() => NavigatorService.navigate('ReconsentDiseaseSummary')}
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
