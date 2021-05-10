import { covidIcon } from '@assets';
import { RegularBoldText } from '@covid/components';
import { BrandedButton } from '@covid/components/buttons';
import i18n from '@covid/locale/i18n';
import { colors } from '@theme';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { FlexView } from './FlexView';

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
  ctaBlock: {
    alignSelf: 'center',
    width: '80%',
  },
  mainBlock: {
    alignItems: 'center',
  },
  statusText: {
    color: colors.tertiary,
    textAlign: 'center',
  },
  textBox: {
    marginVertical: 32,
  },
});

export default Splash;
