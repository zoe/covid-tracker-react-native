import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { RegularBoldText, BrandedButton } from './Text';
import { covidIcon } from '../../assets';
import { colors } from '../../theme';

type SplashProps = {
  status: string;
  onRetry?: any;
};

type FlexViewProps = {
  children?: React.ReactNode;
}

const FlexView = ({children}: FlexViewProps) => {
  return (
    <View style={styles.flexView}>{children}</View>
  )
}

const Splash = ({ status, onRetry = null }: SplashProps) => {
  return (
    <FlexView>
      <FlexView />
      <View style={styles.mainBlock}>
        <Image source={covidIcon} />
        <View style={styles.textBox}>
          <RegularBoldText style={styles.statusText}>{status}</RegularBoldText>
        </View>
      </View>
      <FlexView>
        {onRetry && (
          <View style={styles.ctaBlock}>
            <BrandedButton onPress={onRetry}>Retry</BrandedButton>
          </View>
        )}
      </FlexView>
    </FlexView>
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
