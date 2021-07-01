import { SafeLayout, Text } from '@covid/components';
import ReconsentFooter from '@covid/features/reconsent/components/ReconsentFooter';
import ReconsentHeader from '@covid/features/reconsent/components/ReconsentHeader';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { styling, useTheme } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function ReconsentReconsiderScreen() {
  const theme = useTheme();

  return (
    <SafeLayout style={styles.page}>
      <ScrollView contentContainerStyle={styling.flexGrow} style={{ paddingHorizontal: theme.grid.gutter }}>
        <ReconsentHeader />
        <View>
          <Text>Reconsider with video screen</Text>
        </View>
      </ScrollView>
      <ReconsentFooter onPress={() => NavigatorService.navigate('Splash')} title={i18n.t('navigation.next')} />
    </SafeLayout>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.backgroundPrimary,
  },
});
