import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import i18n from '@covid/locale/i18n';
import { Avatar, Spacer, Text, RoundIconButton } from '@covid/components';
import { drSarahBerry, QuoteMarks } from '@assets';

function DietStudyCard() {
  const getImgSrc = () => {
    // en, es, en-US, sv-SE
    const locale = i18n.currentLocale();
    switch (locale) {
      default:
        return drSarahBerry;
    }
  };

  return (
    <TouchableOpacity style={[styles.container]}>
      <View style={styles.row}>
        <View style={styles.column}>
          <QuoteMarks />
          <Spacer />
          <Text textClass="h5Regular">{i18n.t('diet-study.results-ready')}</Text>
        </View>
        <View>
          <Avatar imgsrc={getImgSrc()} />
          <Text>{i18n.t('diet-study.doctor-name')}</Text>
          <Text textClass="pSmall" style={{ color: '#888B8C' }}>
            {i18n.t('diet-study.doctor-title')}
          </Text>
          <Text textClass="pSmall" style={{ color: '#888B8C' }}>
            {i18n.t('diet-study.doctor-location')}
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text>bottom row</Text>
        </View>
        <View>
          <RoundIconButton iconName="arrow_forward_ios" onPress={() => null} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flex: 1,
  },
});

export default DietStudyCard;
