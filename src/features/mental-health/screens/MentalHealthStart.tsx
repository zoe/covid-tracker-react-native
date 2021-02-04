import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { BrandedButton, RoundIconButton, SafeLayout } from '@covid/components';
import NavigatorService from '@covid/NavigatorService';

function MentalHealthStart() {
  const { goBack } = useNavigation();
  return (
    <SafeLayout>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={{ marginTop: 24 }}>
          <RoundIconButton
            backgroundColor="black"
            iconColor="white"
            iconName="arrow_back_ios"
            iconStyle={{ transform: [{ translateX: 3 }] }}
            onPress={() => goBack()}
          />
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
