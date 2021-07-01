import InfoCircle from '@assets/icons/InfoCircle';
import { ClockIcon } from '@assets/icons/svgIcons';
import { BasicPage, HeaderText, RegularText, Spacer, Text } from '@covid/components';
import { ScreenParamList } from '@covid/features';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { RouteProp } from '@react-navigation/native';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

interface IProps {
  route: RouteProp<ScreenParamList, 'LongCovidStart'>;
}

export default function LongCovidStartScreen({ route }: IProps) {
  const patientData = route.params?.patientData;

  return (
    <BasicPage
      withGutter
      footerTitle={i18n.t('long-covid.button')}
      onPress={() => NavigatorService.navigate('LongCovidQuestion', { patientData })}
      testID="long-covid-start-screen"
    >
      <View style={styles.oneOff}>
        <Text style={styles.oneOffText}>{i18n.t('long-covid.one-off')}</Text>
      </View>
      <HeaderText style={{ ...styles.text, marginTop: 8 }}>{i18n.t('long-covid.title')}</HeaderText>
      <View style={{ alignItems: 'center', alignSelf: 'center', flexDirection: 'row', margin: 'auto', marginTop: 16 }}>
        <View style={{ height: 20, width: 20 }}>
          <ClockIcon />
        </View>
        <RegularText style={{}}>{i18n.t('long-covid.time')}</RegularText>
      </View>
      <RegularText style={styles.text}>{i18n.t('long-covid.body-2')}</RegularText>
      <RegularText style={styles.text}>{i18n.t('long-covid.body-3')}</RegularText>
      <Spacer space={24} />
      <View style={{ ...styles.infoBox, marginBottom: 24 }}>
        <View style={{ flexDirection: 'row', paddingRight: 24, paddingTop: 16 }}>
          <View style={{ paddingRight: 12 }}>
            <InfoCircle color={colors.brand} />
          </View>
          <RegularText style={{ color: colors.brand }}>{i18n.t('long-covid.apology')}</RegularText>
        </View>
      </View>
    </BasicPage>
  );
}

const styles = StyleSheet.create({
  infoBox: {
    backgroundColor: '#dee8f0', // This is the brand colour with .2 opacity
    borderRadius: 8,
    marginTop: 16,
    padding: 16,
    paddingBottom: 24,
    textAlign: 'left',
  },
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
