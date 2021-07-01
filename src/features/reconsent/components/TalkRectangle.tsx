import Triangle from '@covid/features/reconsent/components/Triangle';
import { colors } from '@theme/colors';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

interface IProps {
  children?: React.ReactNode;
}

export default function TalkRectangle(props: IProps) {
  return (
    <View>
      <Triangle color={colors.backgroundWhiteBlue} direction="up" height={20} style={styles.triangle} width={30} />
      <View style={styles.view}>{props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  triangle: {
    alignSelf: 'center',
  },
  view: {
    backgroundColor: colors.backgroundWhiteBlue,
    borderRadius: 16,
    padding: 32,
  },
});
