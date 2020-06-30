import React from 'react';
import { StyleSheet, View } from 'react-native';
import CalendarPicker, { CalendarPickerProps } from 'react-native-calendar-picker';

import { colors } from '@theme';
import { isUSCountry } from '@covid/core/user/UserService';

import { screenWidth } from './Screen';

const ZoeCalendarPicker = (props: CalendarPickerProps) => (
  <View style={styles.calendarView}>
    <CalendarPicker
      {...props}
      startFromMonday={!isUSCountry()}
      selectedDayStyle={styles.selectedDay}
      selectedDayTextColor={colors.white}
      selectedRangeStyle={styles.selectedRange}
      todayTextStyle={styles.today}
      todayBackgroundColor="transparent"
      width={screenWidth - 16}
    />
  </View>
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
  calendarView: {
    padding: 10,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default ZoeCalendarPicker;
