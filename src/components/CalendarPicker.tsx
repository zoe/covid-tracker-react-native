import { isUSCountry } from '@covid/core/localisation/LocalisationService';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import CalendarPicker, { CalendarPickerProps } from 'react-native-calendar-picker';

import { screenWidth } from './Screen';

const ZoeCalendarPicker = (props: CalendarPickerProps) => (
  <View style={styles.calendarView}>
    <CalendarPicker
      {...props}
      selectedDayStyle={styles.selectedDay}
      selectedDayTextColor={colors.white}
      selectedRangeStyle={styles.selectedRange}
      startFromMonday={!isUSCountry()}
      todayBackgroundColor="transparent"
      todayTextStyle={styles.today}
      width={screenWidth - 16}
    />
  </View>
);

const styles = StyleSheet.create({
  calendarView: {
    alignItems: 'center',
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 8,
    padding: 12,
  },
  selectedDay: {
    backgroundColor: colors.lightBlueBrand,
  },
  selectedRange: {
    backgroundColor: colors.lightBlueBrand,
  },
  today: {
    color: colors.purple,
    fontFamily: 'SofiaPro-Bold',
  },
});

export default ZoeCalendarPicker;
