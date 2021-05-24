import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { colors, styling } from '@covid/themes';
import { Text } from '@covid/components';
import i18n from '@covid/locale/i18n';

export default function EmptyState() {
  return (
    <View style={styles.view}>
      <ActivityIndicator color={colors.coral.main.bgColor} size="large" />
      <Text style={styling.marginTop} textAlign="center" textClass="h3Regular">
        {i18n.t('loading')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
