import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import { colors } from '@theme';
import { PoweredByZoeSmall } from '@covid/components/Logos/PoweredByZoe';
import { Header3Text, RegularText, BrandedButton, CaptionText } from '@covid/components/Text';
import { covidIcon } from '@assets';

export const Header: React.FC = () => {
  return (
    <View style={styles.root}>
      <Image source={covidIcon} style={styles.logo} />

      <View style={styles.reportCard}>
        <Header3Text style={styles.dateLabel}>Wednesday 22 July</Header3Text>
        <BrandedButton style={styles.reportButton} onPress={() => {}}>
          Report now
        </BrandedButton>
        <CaptionText style={styles.reportedCount}>You’ve reported 43 times</CaptionText>
      </View>

      <RegularText style={styles.contributorsLabel}>Contributors so far:</RegularText>

      <Header3Text style={styles.contributorsCount}>2,503,450</Header3Text>

      <View style={{ width: '100%' }}>
        <PoweredByZoeSmall />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.predict,
    alignItems: 'center',
    width: '100%',
    paddingTop: 40,
    paddingBottom: 24,
  },

  logo: {
    width: 54,
    height: 54,
    resizeMode: 'contain',
    margin: 8,
  },

  reportCard: {
    width: '85%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 20,
    marginVertical: 16,
  },

  dateLabel: {
    fontWeight: '500',
    color: 'white',
  },

  reportButton: {
    textAlign: 'center',
    backgroundColor: colors.purple,
    alignSelf: 'center',
    elevation: 0,
    paddingHorizontal: 52,
    height: 48,
    marginTop: 16,
    marginBottom: 8,
  },

  reportedCount: {
    margin: 4,
    textAlign: 'center',
    color: colors.backgroundFour,
  },

  contributorsLabel: {
    color: colors.white,
  },

  contributorsCount: {
    fontWeight: '500',
    color: colors.white,
  },
});
