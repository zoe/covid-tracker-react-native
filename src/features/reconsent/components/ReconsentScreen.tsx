import { SafeLayout, Text } from '@covid/components';
import { BrandedButton } from '@covid/components/buttons';
import { grid, styling, useTheme } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

interface IProps {
  buttonTitle: string;
  buttonOnPress: () => void;
  children?: React.ReactNode;
  secondaryButtonTitle?: string;
  secondaryButtonOnPress?: () => void;
}

export default function ReconsentScreen(props: IProps) {
  const theme = useTheme();

  return (
    <SafeLayout style={styles.safeLayout}>
      <ScrollView contentContainerStyle={styling.flexGrow} style={{ paddingHorizontal: theme.grid.xxl }}>
        {props.children}
        <BrandedButton enable onPress={props.buttonOnPress} style={styles.button}>
          {props.buttonTitle}
        </BrandedButton>
        <Text onPress={props.secondaryButtonOnPress} style={styles.secondaryButton} textClass="pLight">
          {props.secondaryButtonTitle}
        </Text>
      </ScrollView>
    </SafeLayout>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.purple,
    marginTop: 'auto',
  },
  safeLayout: {
    backgroundColor: colors.backgroundPrimary,
  },
  secondaryButton: {
    color: colors.secondary,
    marginTop: grid.xxxl,
    paddingHorizontal: grid.xs,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
