import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import Screen, { Header } from '@covid/components/Screen';
import { HeaderText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import { SelectorButton } from '@covid/components/SelectorButton';

import { ScreenParamList } from '../../ScreenParamList';

type HowYouFeelProps = {
  navigation: StackNavigationProp<ScreenParamList, 'BeforeWeStartUS'>;
};

export default class BeforeWeStart extends Component<HowYouFeelProps> {
  render() {
    return (
      <Screen>
        <Header>
          <HeaderText>{i18n.t('before-we-start.title')}</HeaderText>
        </Header>

        <View style={styles.content}>
          <SelectorButton
            onPress={() => this.props.navigation.navigate('NursesConsentUS', { viewOnly: false })}
            text={i18n.t('before-we-start.yes')}
          />
          <SelectorButton
            onPress={() => this.props.navigation.navigate('Consent', { viewOnly: false })}
            text={i18n.t('before-we-start.no')}
          />
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    marginVertical: 32,
  },
});
