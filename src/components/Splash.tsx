import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { RegularBoldText, BrandedButton } from './Text';
import { covidIcon } from '../../assets';
import { colors } from '../../theme';

type SplashProps = {
  status: string;
  onRetry?: any;
};

const Splash = ({ status, onRetry = null }: SplashProps) => {
  return (
    <View style={styles.flexView}>
      <View style={styles.flexView} />
      <View style={styles.mainBlock}>
        <Image source={covidIcon} />
        <View style={styles.textBox}>
          <RegularBoldText style={styles.statusText}>{status}</RegularBoldText>
        </View>
      </View>
      <View style={styles.flexView}>
        {onRetry && (
          <View style={styles.ctaBlock}>
            <BrandedButton onPress={onRetry}>Retry</BrandedButton>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexView: {
    flex: 1,
  },
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
