import InfoCircle from '@assets/icons/InfoCircle';
import { ClockIcon } from '@assets/icons/svgIcons';
import { HeaderText, RegularText, Spacer, Text } from '@covid/components';
import { Screen } from '@covid/components/Screen';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { TScreenParamList } from '@covid/routes/types';
import { sizes } from '@covid/themes';
import { RouteProp } from '@react-navigation/native';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

interface IProps {
  route: RouteProp<TScreenParamList, 'LongCovidStart'>;
}

export default function LongCovidStartScreen({ route }: IProps) {
  const patientData = route.params?.patientData;

  return (
    <Screen
      footerOnPress={() => NavigatorService.navigate('LongCovidQuestion', { patientData })}
      footerTitle={i18n.t('long-covid.button')}
      testID="long-covid-start-screen"
    >
      <View style={styles.oneOff}>
        <Text style={styles.oneOffText}>{i18n.t('long-covid.one-off')}</Text>
      </View>
      <HeaderText style={{ ...styles.text, marginTop: sizes.xs }}>{i18n.t('long-covid.title')}</HeaderText>
      <View
        style={{ alignItems: 'center', alignSelf: 'center', flexDirection: 'row', margin: 'auto', marginTop: sizes.m }}
      >
        <View style={{ height: 20, width: 20 }}>
          <ClockIcon />
        </View>
        <RegularText>{i18n.t('long-covid.time')}</RegularText>
      </View>
      <RegularText style={styles.text}>{i18n.t('long-covid.body-2')}</RegularText>
      <RegularText style={styles.text}>{i18n.t('long-covid.body-3')}</RegularText>
      <Spacer space={24} />
      <View style={styles.infoBox}>
        <View style={{ flexDirection: 'row', paddingRight: sizes.l, paddingTop: sizes.m }}>
          <View style={{ paddingRight: sizes.s }}>
            <InfoCircle color={colors.brand} />
          </View>
          <RegularText style={{ color: colors.brand }}>{i18n.t('long-covid.apology')}</RegularText>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  infoBox: {
    backgroundColor: '#dee8f0', // This is the brand colour with .2 opacity
    borderRadius: sizes.xs,
    marginBottom: sizes.l,
    marginTop: sizes.m,
    padding: sizes.m,
    paddingBottom: sizes.l,
    textAlign: 'left',
  },
  oneOff: {
    alignSelf: 'center',
    backgroundColor: colors.brand,
    borderRadius: sizes.xxs,
    margin: 'auto',
    marginBottom: sizes.m,
    paddingHorizontal: sizes.xs,
  },
  oneOffText: {
    alignSelf: 'center',
    color: colors.white,
    fontSize: 12,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  text: {
    padding: sizes.m,
    textAlign: 'center',
  },
});
