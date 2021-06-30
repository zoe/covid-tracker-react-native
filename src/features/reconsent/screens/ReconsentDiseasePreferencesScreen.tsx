import { Brain } from '@assets/icons/svgIcons';
import { SafeLayout, Text } from '@covid/components';
import DiseaseCard from '@covid/features/reconsent/components/DiseaseCard';
import ReconsentFooter from '@covid/features/reconsent/components/ReconsentFooter';
import ReconsentHeader from '@covid/features/reconsent/components/ReconsentHeader';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { grid, styling, useTheme } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

type TDiseaseType = {
  iconName: React.ElementType;
  name: string;
};

export default function ReconsentDiseasePreferencesScreen() {
  const theme = useTheme();
  const [showExtendedList, setShowExtendedList] = React.useState<boolean>(false);
  const addToPreferences = () => {
    console.log('hi');
  };

  // TODO: Replace icons

  const initialDiseases = [
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

  const extendedDiseases = [
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

  const renderDiseaseCards = (diseasesArray: TDiseaseType[]) => {
    return diseasesArray.map((disease) => (
      <DiseaseCard
        description={i18n.t(`disease-cards.${disease.name}.description`)}
        iconName={disease.iconName}
        name={i18n.t(`disease-cards.${disease.name}.name`)}
        onPressHandler={addToPreferences}
        style={{ marginBottom: grid.xxl }}
      />
    ));
  };

  return (
    <SafeLayout style={styles.page}>
      <ScrollView contentContainerStyle={styling.flexGrow} style={{ paddingHorizontal: theme.grid.gutter }}>
        <ReconsentHeader showBackIcon showDots />
        <View>
          <Text>What matters most to you?</Text>
          <Text>Select as many as you like</Text>
          {renderDiseaseCards(initialDiseases)}
          {showExtendedList ? null : (
            <Pressable onPress={() => setShowExtendedList(true)}>
              <Text>Show more</Text>
            </Pressable>
          )}
          {showExtendedList ? renderDiseaseCards(extendedDiseases) : null}
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
  page: {
    backgroundColor: colors.backgroundPrimary,
  },
});
