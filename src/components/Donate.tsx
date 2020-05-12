import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '../../theme';
import { BrandedButton, HeaderText, RegularBoldText, RegularText, SecondaryText } from '../components/Text';
import i18n from '../locale/i18n';

export default class Donate extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/*<RegularBoldText style={styles.share}>{i18n.t('donate.banner')}</RegularBoldText>*/}
        <HeaderText style={styles.primary}>{i18n.t('donate.primary-text')}</HeaderText>
        <SecondaryText style={styles.secondary}>{i18n.t('donate.secondary-text')}</SecondaryText>
        <BrandedButton onPress={() => {}} style={styles.button}>
          {i18n.t('donate.button-text')}
        </BrandedButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginHorizontal: 20,
    alignContent: 'center',
  },
  primary: {
    textAlign: 'center',
    marginBottom: 20,
  },
  secondary: {
    textAlign: 'center',
  },
  button: {
    marginTop: 30,
  },
});
