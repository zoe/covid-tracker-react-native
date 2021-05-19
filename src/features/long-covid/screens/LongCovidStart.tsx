import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ClockIcon } from '@assets/icons/svgIcons';
import { BasicPage, HeaderText, RegularText, Spacer, Text } from '@covid/components';
import { ScreenParamList } from '@covid/features';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { RouteProp } from '@react-navigation/native';
import { colors } from '@theme';

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
      <View style={styles.oneOff}><Text style={styles.oneOffText}>{i18n.t('long-covid.one-off')}</Text></View>
      <HeaderText style={{...styles.text, marginTop: 8 }}>{i18n.t('long-covid.title')}</HeaderText>
        <View style={{ flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', marginTop: 16 }}>
        <View style={{ width: 20, height: 20 }}><ClockIcon /></View>
        <RegularText style={{}}>{i18n.t('long-covid.time')}</RegularText>
      </View>
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
    borderRadius: 4,
    margin: 'auto',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  oneOffText: {
    alignSelf: 'center',
    color: colors.white,
    fontSize: 12,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  text: {
    padding: 16,
    textAlign: 'center',
  },
});
