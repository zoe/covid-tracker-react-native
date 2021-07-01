import InfoCircle from '@assets/icons/InfoCircle';
import { Text } from '@covid/components';
import { grid } from '@covid/themes';
import { colors } from '@theme/colors';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

interface IProps {
  text: string;
}

export default function InfoBox(props: IProps) {
  return (
    <View style={styles.card}>
      <View style={styles.icon}>
        <InfoCircle color={colors.darkblue} />
      </View>
      <Text style={styles.text} textClass="pLight">
        {props.text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.lightBlueBackground,
    borderRadius: grid.l,
    flexDirection: 'row',
    paddingHorizontal: grid.l,
    paddingVertical: grid.m,
  },
  icon: {
    marginTop: grid.xxs,
  },
  text: {
    color: colors.darkblue,
    justifyContent: 'flex-start',
    marginLeft: grid.s,
    paddingRight: grid.l,
  },
});
