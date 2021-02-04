import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { BrandedButton } from '@covid/components';
import NavigatorService from '@covid/NavigatorService';

import { Container } from '../partials';

function MentalHealthStart() {
  return (
    <Container>
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
    </Container>
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
