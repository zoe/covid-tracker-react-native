import { BrandedButton, RegularBoldText, SecondaryText } from '@covid/components/Text';
import Analytics, { events } from '@covid/core/Analytics';
import i18n from '@covid/locale/i18n';
import { colors } from '@theme';
import { Linking } from 'expo';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { CoralBadge } from './Badge';

export default class Donate extends Component {
  constructor(props: any) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    Analytics.track(events.DONATE);
    Linking.openURL(i18n.t('donate.url'));
  }

  render() {
    return (
      <View style={styles.container}>
        <CoralBadge>{i18n.t('donate.banner')}</CoralBadge>
        <RegularBoldText style={styles.primary}>{i18n.t('donate.primary-text')}</RegularBoldText>
        <SecondaryText style={styles.secondary}>{i18n.t('donate.secondary-text')}</SecondaryText>
        <BrandedButton onPress={this.handleClick} style={styles.button}>
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
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  secondary: {
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
  },
});
