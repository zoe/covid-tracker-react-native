import CalendarPicker, { CalendarPickerProps } from 'react-native-calendar-picker';
import { colors } from '../../theme';
import { screenWidth } from './Screen';
import React from 'react';
import { StyleSheet } from 'react-native';

const ZoeCalendarPicker = (props: CalendarPickerProps) => (
  <CalendarPicker
    {...props}
    startFromMonday={true}
    selectedDayStyle={styles.selectedDay}
    selectedDayTextColor={colors.white}
    selectedRangeStyle={styles.selectedRange}
    todayTextStyle={styles.today}
    todayBackgroundColor={'transparent'}
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
