import { SafeLayout } from '@covid/components';
import { BrandedButton } from '@covid/components/buttons';
import { styling, useTheme } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

interface IProps {
  buttonTitle: string;
  buttonOnPress: () => void;
  children?: React.ReactNode;
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
});
