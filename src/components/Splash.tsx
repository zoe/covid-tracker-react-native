import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { RegularBoldText, BrandedButton } from './Text';
import { covidIcon } from '../../assets';
import { colors } from '../../theme';
import { FlexView } from './FlexView';
import i18n from '../locale/i18n';

type SplashProps = {
  status: string;
  onRetry?: () => void;
};

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
      </FlexView>
    </FlexView>
  );
};

const styles = StyleSheet.create({
  mainBlock: {
    alignItems: 'center',
  },
  textBox: {
    marginVertical: 10,
  },
  ctaBlock: {
    width: '80%',
    alignSelf: 'center',
  },
  statusText: {
    color: colors.tertiary,
  },
});

export default Splash;
