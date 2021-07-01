import { Brain } from '@assets/icons/svgIcons';
import { SafeLayout, Text } from '@covid/components';
import DiseaseCard from '@covid/features/reconsent/components/DiseaseCard';
import InfoBox from '@covid/features/reconsent/components/InfoBox';
import ReconsentFooter from '@covid/features/reconsent/components/ReconsentFooter';
import ReconsentHeader from '@covid/features/reconsent/components/ReconsentHeader';
import { TDiseasePreference } from '@covid/features/reconsent/types';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { grid, styling, useTheme } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, View } from 'react-native';

// TODO: Replace icons

const initialDiseases: TDiseasePreference[] = [
  {
    IconElement: Brain,
    name: 'dementia',
  },
  {
    IconElement: Brain,
    name: 'cvd',
  },
  {
    IconElement: Brain,
    name: 'cancer',
  },
  {
    IconElement: Brain,
    name: 'joint-bone',
  },
  {
    IconElement: Brain,
    name: 'mental-health',
  },
];

const extendedDiseases: TDiseasePreference[] = [
  {
    IconElement: Brain,
    name: 'womens-health',
  },
  {
    IconElement: Brain,
    name: 'vision-hearing',
  },
  {
    IconElement: Brain,
    name: 'autoimmune',
  },
  {
    IconElement: Brain,
    name: 'skin',
  },
  {
    IconElement: Brain,
    name: 'lung',
  },
  {
    IconElement: Brain,
    name: 'neurological',
  },
];

export default function ReconsentDiseasePreferencesScreen() {
  const theme = useTheme();
  const [showExtendedList, setShowExtendedList] = React.useState<boolean>(false);
  const addToPreferences = () => {
    console.log('hi');
  };

  const renderItem = ({ item }: { item: TDiseasePreference }) => {
    return (
      <DiseaseCard
        description={i18n.t(`disease-cards.${item.name}.description`)}
        IconElement={item.IconElement}
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
        + Show more
      </Text>
    </Pressable>
  );

  return (
    <SafeLayout style={styles.page}>
      <ScrollView contentContainerStyle={styling.flexGrow} style={{ paddingHorizontal: theme.grid.xxl }}>
        <ReconsentHeader showBackIcon showDots />
        <View>
          <Text rhythm={24} textAlign="center" textClass="h2Light">
            What matters most to you?
          </Text>
          <Text rhythm={16} style={styles.subtitle} textAlign="center" textClass="pLight">
            Select as many as you like
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
        </View>
      </ScrollView>
      <ReconsentFooter
        onPress={() => NavigatorService.navigate('ReconsentDiseaseSummary')}
        title={i18n.t('navigation.next')}
      />
    </SafeLayout>
  );
}

const styles = StyleSheet.create({
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
