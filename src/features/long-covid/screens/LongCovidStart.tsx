import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import { BasicPage, Text, Spacer, RegularText, HeaderText } from '@covid/components';
import NavigatorService from '@covid/NavigatorService';
import i18n from '@covid/locale/i18n';
import { colors } from '@theme';
import { RouteProp } from '@react-navigation/native';
import { ScreenParamList } from '@covid/features';

interface IProps {
  route: RouteProp<ScreenParamList, 'LongCovidStart'>;
}

export default function LongCovidStartScreen({ route }: IProps) {
  //const LongCovidState = useSelector(LongCovidStart);
  const dispatch = useDispatch();
  const { patientData } = route.params;

  console.log('START IT WITH ', patientData.patientId)

  useEffect(() => {
    // if (!LongCovidState.completed) {
    //   dispatch(setCompleted(true));
    // }
  });

  return (
    <BasicPage footerTitle="Next" onPress={() => 
      NavigatorService.navigate('LongCovidQuestionPageOne', {patientData: patientData})
    } withGutter>
        <Text style={styles.oneOff}>
          {i18n.t('long-covid.one-off')}
        </Text>
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
    backgroundColor: colors.brand,
    color: colors.white,
    paddingVertical: 4,
    borderRadius: 16,
    width: 220,
    margin: 'auto',
    marginBottom: 16,
    textAlign: 'center',
    alignSelf: 'center',
    textTransform: 'uppercase',
    fontSize: 12
  },
  tickContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  tick: {
    alignItems: 'center',
    borderColor: '#C0D904',
    borderRadius: 24,
    borderWidth: 3,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  text: {
    textAlign: 'center',
    padding: 16,
  }
});