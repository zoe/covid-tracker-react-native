import {
  Brain,
  Cancer,
  Cell,
  EyeEar,
  Female,
  Gut,
  Heart,
  Immune,
  Joint,
  LightBulb,
  Lungs,
  Neuron,
} from '@assets/icons/svgIcons';
import { Text } from '@covid/components';
import { BrandedButton } from '@covid/components/buttons';
import { selectDiseasePreferences } from '@covid/core/state/reconsent';
import { updateDiseasePreferences } from '@covid/core/state/reconsent/slice';
import { TDisease, TDiseasePreferencesData } from '@covid/core/state/reconsent/types';
import DiseaseCard from '@covid/features/reconsent/components/DiseaseCard';
import InfoBox from '@covid/features/reconsent/components/InfoBox';
import ReconsentScreen from '@covid/features/reconsent/components/ReconsentScreen';
import ShowMore from '@covid/features/reconsent/components/ShowMore';
import { TDiseasePreference } from '@covid/features/reconsent/types';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { grid } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

// TODO: Replace icons

const initialDiseases: TDiseasePreference[] = [
  {
    IconComponent: Brain,
    name: 'research_consent_dementia',
  },
  {
    IconComponent: Heart,
    name: 'research_consent_cardiovascular_diseases',
  },
  {
    IconComponent: Cancer,
    name: 'research_consent_cancer',
  },
  {
    IconComponent: Joint,
    name: 'research_consent_joint_and_bone_diseases',
  },
  {
    IconComponent: LightBulb,
    name: 'research_consent_mental_health',
  },
  {
    IconComponent: Gut,
    name: 'research_consent_nutrition_and_gut_health',
  },
];

const extendedDiseases: TDiseasePreference[] = [
  {
    IconComponent: Female,
    name: 'research_consent_womens_health',
  },
  {
    IconComponent: EyeEar,
    name: 'research_consent_vision_and_hearing_conditions',
  },
  {
    IconComponent: Immune,
    name: 'research_consent_autoimmune_conditions',
  },
  {
    IconComponent: Cell,
    name: 'research_consent_skin_conditions',
  },
  {
    IconComponent: Lungs,
    name: 'research_consent_lung_diseases',
  },
  {
    IconComponent: Neuron,
    name: 'research_consent_neurological_conditions',
  },
];

export default function ReconsentDiseasePreferencesScreen() {
  const dispatch = useDispatch();
  const diseasePreferencesPersisted = useSelector(selectDiseasePreferences);

  const extendedListDiseaseNames: TDisease[] = extendedDiseases.map((item) => item.name);
  const identifiers = Object.keys(diseasePreferencesPersisted) as TDisease[];

  const initialStateShowExtendedList = identifiers
    .filter((key) => extendedListDiseaseNames.includes(key))
    .some((key) => diseasePreferencesPersisted[key] === true);

  const [showExtendedList, setShowExtendedList] = React.useState<boolean>(initialStateShowExtendedList);
  const [diseasePreferences, setDiseasePreferences] =
    React.useState<TDiseasePreferencesData>(diseasePreferencesPersisted);

  const toggleDisease = (disease: TDisease) => {
    setDiseasePreferences((prevState) => ({ ...prevState, [disease]: !prevState[disease] }));
  };

  const onPress = () => {
    dispatch(updateDiseasePreferences(diseasePreferences));
    NavigatorService.navigate('ReconsentDiseaseSummary');
  };

  const renderItem = ({ item }: { item: TDiseasePreference }) => {
    return (
      <DiseaseCard
        description={i18n.t(`disease-cards.${item.name}.description`)}
        IconComponent={item.IconComponent}
        initialStateIsActive={diseasePreferencesPersisted[item.name] || false}
        key={item.name}
        onPressHandler={() => toggleDisease(item.name)}
        style={{ marginBottom: grid.xxl }}
        title={i18n.t(`disease-cards.${item.name}.name`)}
      />
    );
  };

  return (
    <ReconsentScreen noPadding activeDot={1}>
      <View style={styles.padding}>
        <Text rhythm={24} textAlign="center" textClass="h2Light">
          {i18n.t('reconsent.disease-preferences.title')}
        </Text>
        <Text inverted colorPalette="uiDark" colorShade="dark" textAlign="center" textClass="pLight">
          {i18n.t('reconsent.disease-preferences.subtitle')}
        </Text>
      </View>
      <FlatList
        contentContainerStyle={styles.padding}
        data={showExtendedList ? initialDiseases.concat(extendedDiseases) : initialDiseases}
        keyExtractor={(disease: TDiseasePreference) => disease.name}
        ListFooterComponent={<ShowMore onPress={() => setShowExtendedList(true)} style={styles.padding} />}
        ListFooterComponentStyle={showExtendedList ? { display: 'none' } : null}
        renderItem={renderItem}
        style={{ overflow: 'visible' }}
      />
      <View style={styles.padding}>
        <InfoBox text={i18n.t('reconsent.disease-preferences.how-data-used')} />

        <BrandedButton onPress={onPress} style={styles.button}>
          {i18n.t('navigation.next')}
        </BrandedButton>
      </View>
    </ReconsentScreen>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.purple,
    marginTop: 16,
  },
  padding: {
    padding: 16,
  },
  page: {
    backgroundColor: colors.backgroundPrimary,
  },
});
