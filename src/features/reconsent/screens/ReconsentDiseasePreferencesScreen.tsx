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
import { ScrollView, StyleSheet, View } from 'react-native';

export default function ReconsentDiseasePreferencesScreen() {
  const theme = useTheme();
  const addToPreferences = () => {
    console.log('hi');
  };

  // TODO: Replace icons

  const diseases = [
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

  const renderDiseaseCards = () => {
    return diseases.map((disease) => (
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
          {renderDiseaseCards()}
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
