import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { BasicPage, Done, Text, SimpleShare, Spacer, RegularText, HeaderText } from '@covid/components';
import NavigatorService from '@covid/NavigatorService';
import i18n from '@covid/locale/i18n';
import { setCompleted } from '@covid/core/state';
import { events } from '@covid/core/Analytics';
import { colors } from '@theme';

export default function LongCovidStartScreen() {
  //const LongCovidState = useSelector(LongCovidStart);
  const dispatch = useDispatch();

  useEffect(() => {
    // if (!LongCovidState.completed) {
    //   dispatch(setCompleted(true));
    // }
  });

  return (
    <BasicPage footerTitle="Next" onPress={() => NavigatorService.navigate('LongCovidQuestionPageOne', undefined)} withGutter>
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