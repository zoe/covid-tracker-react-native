import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { BrandedButton, SafeLayout } from '@covid/components';
import NavigatorService from '@covid/NavigatorService';

function MentalHealthStart() {
  return (
    <SafeLayout>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={{ borderColor: 'green', borderWidth: 1 }}>
          <Text>The start</Text>
        </View>
        <View style={styles.footer}>
          <BrandedButton onPress={() => NavigatorService.navigate('MentalHealthChanges', undefined)}>
            Start
          </BrandedButton>
        </View>
      </ScrollView>
    </SafeLayout>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  footer: {
    paddingBottom: 8,
    paddingTop: 32,
  },
});

export default MentalHealthStart;
