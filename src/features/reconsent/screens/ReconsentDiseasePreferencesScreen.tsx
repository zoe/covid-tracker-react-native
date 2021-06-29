import { SafeLayout, Text } from '@covid/components';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { styling, useTheme } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import ReconsentFooter from '../components/ReconsentFooter';
import ReconsentHeader from '../components/ReconsentHeader';

export default function ReconsentDiseasePreferencesScreen() {
  const theme = useTheme();

  return (
    <SafeLayout style={styles.page}>
      <ScrollView contentContainerStyle={styling.flexGrow} style={{ paddingHorizontal: theme.grid.gutter }}>
        <ReconsentHeader showBackIcon showDots />
        <View>
          <Text>Disease preferences screen</Text>
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
