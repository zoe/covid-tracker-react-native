import { isUSCountry } from '@covid/core/user/UserService';
import { colors } from '@theme';
import React from 'react';
import { StyleSheet } from 'react-native';
import CalendarPicker, { CalendarPickerProps } from 'react-native-calendar-picker';

import { screenWidth } from './Screen';

const ZoeCalendarPicker = (props: CalendarPickerProps) => (
  <CalendarPicker
    {...props}
    startFromMonday={!isUSCountry()}
    selectedDayStyle={styles.selectedDay}
    selectedDayTextColor={colors.white}
    selectedRangeStyle={styles.selectedRange}
    todayTextStyle={styles.today}
    todayBackgroundColor="transparent"
    scaleFactor={screenWidth + 30}
  />
);

const styles = StyleSheet.create({
  selectedDay: {
    backgroundColor: colors.lightBlueBrand,
  },
  selectedRange: {
    backgroundColor: colors.lightBlueBrand,
  },
  today: {
    color: colors.purple,
    fontWeight: '700',
  },
});

export default ZoeCalendarPicker;
