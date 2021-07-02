import { Brain } from '@assets/icons/svgIcons';
import { Text } from '@covid/components';
import DiseaseCard from '@covid/features/reconsent/components/DiseaseCard';
import InfoBox from '@covid/features/reconsent/components/InfoBox';
import ReconsentHeader from '@covid/features/reconsent/components/ReconsentHeader';
import ReconsentScreen from '@covid/features/reconsent/components/ReconsentScreen';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { grid } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

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
  const [showExtendedList, setShowExtendedList] = React.useState<boolean>(false);

  const renderItem = ({ item }: { item: TDiseaseType }) => {
    return (
      <DiseaseCard
        description={i18n.t(`disease-cards.${item.name}.description`)}
        iconName={item.iconName}
        key={item.name}
        name={i18n.t(`disease-cards.${item.name}.name`)}
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
      buttonOnPress={() => NavigatorService.navigate('ReconsentDiseaseConfirmation')}
      buttonTitle={i18n.t('navigation.next')}
    >
      <ReconsentHeader showBackIcon showDots />
      <Text rhythm={24} style={styles.center} textClass="h2Light">
        {i18n.t('reconsent.disease-preferences.title')}
      </Text>
      <Text rhythm={16} style={[styles.center, styles.subtitle]} textClass="pLight">
        {i18n.t('reconsent.disease-preferences.subtitle')}
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
