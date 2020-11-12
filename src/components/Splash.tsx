import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import { covidIcon } from '@assets';
import { colors } from '@theme';
import i18n from '@covid/locale/i18n';

import { FlexView } from './FlexView';
import { RegularBoldText, BrandedButton } from './Text';

type SplashProps = {
  status: string;
  onRetry?: VoidFunction;
  onLogout?: VoidFunction;
};

const Spacer: React.FC = () => <View style={{ height: 12 }} />;

const Splash = (props: SplashProps) => {
  return (
    <FlexView>
      <FlexView />
      <View style={styles.mainBlock}>
        <Image source={covidIcon} />
        <View style={styles.textBox}>
          <RegularBoldText style={styles.statusText}>{props.status}</RegularBoldText>
        </View>
      </View>
      <FlexView>
        {!!props.onRetry && (
          <View style={styles.ctaBlock}>
            <BrandedButton onPress={props.onRetry}>{i18n.t('errors.button-retry')}</BrandedButton>
          </View>
        )}
        <Spacer />
        {!!props.onLogout && (
          <View style={styles.ctaBlock}>
            <BrandedButton onPress={props.onLogout}>{i18n.t('logout')}</BrandedButton>
          </View>
        )}
      </FlexView>
    </FlexView>
  );
};

const styles = StyleSheet.create({
  mainBlock: {
    alignItems: 'center',
  },
  textBox: {
    marginVertical: 32,
  },
  ctaBlock: {
    width: '80%',
    alignSelf: 'center',
  },
  statusText: {
    color: colors.tertiary,
    textAlign: 'center',
  },
});

export default Splash;
