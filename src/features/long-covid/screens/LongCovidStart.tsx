import { BasicPage, HeaderText, RegularText, Spacer, Text } from '@covid/components';
import { ScreenParamList } from '@covid/features';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { RouteProp } from '@react-navigation/native';
import { colors } from '@theme';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

interface IProps {
  route: RouteProp<ScreenParamList, 'LongCovidStart'>;
}

export default function LongCovidStartScreen({ route }: IProps) {
  const { patientData } = route.params;

  return (
    <BasicPage
      withGutter
      footerTitle="Next"
      onPress={() => NavigatorService.navigate('LongCovidQuestionPageOne', { patientData })}
    >
      <Text style={styles.oneOff}>{i18n.t('long-covid.one-off')}</Text>
      <HeaderText style={styles.text}>{i18n.t('long-covid.title')}</HeaderText>
      <RegularText style={styles.text}>{i18n.t('long-covid.time')}</RegularText>
      <RegularText style={styles.text}>{i18n.t('long-covid.body-1')}</RegularText>
      <RegularText style={styles.text}>{i18n.t('long-covid.body-2')}</RegularText>
      <RegularText style={styles.text}>{i18n.t('long-covid.body-3')}</RegularText>
      <Spacer space={24} />
    </BasicPage>
  );
}

const styles = StyleSheet.create({
  oneOff: {
    alignSelf: 'center',
    backgroundColor: colors.brand,
    borderRadius: 16,
    color: colors.white,
    fontSize: 12,
    margin: 'auto',
    marginBottom: 16,
    paddingVertical: 4,
    textAlign: 'center',
    textTransform: 'uppercase',
    width: 220,
  },
  text: {
    padding: 16,
    textAlign: 'center',
  },
});
