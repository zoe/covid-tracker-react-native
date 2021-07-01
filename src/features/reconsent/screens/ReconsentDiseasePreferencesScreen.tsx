import { Brain } from '@assets/icons/svgIcons';
import { SafeLayout, Text } from '@covid/components';
import DiseaseCard from '@covid/features/reconsent/components/DiseaseCard';
import InfoBox from '@covid/features/reconsent/components/InfoBox';
import ReconsentFooter from '@covid/features/reconsent/components/ReconsentFooter';
import ReconsentHeader from '@covid/features/reconsent/components/ReconsentHeader';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { grid, styling, useTheme } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, View } from 'react-native';

type TDiseaseType = {
  iconName: React.ElementType;
  name: string;
};

// TODO: Replace icons

const initialDiseases: TDiseaseType[] = [
  {
    iconName: Brain,
    name: 'dementia',
  },
  {
    iconName: Brain,
    name: 'cvd',
  },
  {
    iconName: Brain,
    name: 'cancer',
  },
  {
    iconName: Brain,
    name: 'joint-bone',
  },
  {
    iconName: Brain,
    name: 'mental-health',
  },
];

const extendedDiseases: TDiseaseType[] = [
  {
    iconName: Brain,
    name: 'womens-health',
  },
  {
    iconName: Brain,
    name: 'vision-hearing',
  },
  {
    iconName: Brain,
    name: 'autoimmune',
  },
  {
    iconName: Brain,
    name: 'skin',
  },
  {
    iconName: Brain,
    name: 'lung',
  },
  {
    iconName: Brain,
    name: 'neurological',
  },
];

export default function ReconsentDiseasePreferencesScreen() {
  const theme = useTheme();
  const [showExtendedList, setShowExtendedList] = React.useState<boolean>(false);
  const addToPreferences = () => {
    console.log('hi');
  };

  const renderItem = ({ item }: { item: TDiseaseType }) => {
    return (
      <DiseaseCard
        description={i18n.t(`disease-cards.${item.name}.description`)}
        iconName={item.iconName}
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
          <Text rhythm={24} style={styles.center} textClass="h2Light">
            What matters most to you?
          </Text>
          <Text rhythm={16} style={[styles.center, styles.subtitle]} textClass="pLight">
            Select as many as you like
          </Text>
          <FlatList
            data={showExtendedList ? initialDiseases.concat(extendedDiseases) : initialDiseases}
            keyExtractor={(disease: TDiseaseType) => disease.name}
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
        onPress={() => NavigatorService.navigate('ReconsentDiseaseConfirmation')}
        title={i18n.t('navigation.next')}
      />
    </SafeLayout>
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
