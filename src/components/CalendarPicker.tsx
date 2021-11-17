import { isUSCountry } from '@covid/core/localisation/LocalisationService';
import { sizes, styling } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import RNCalendarPicker, { CalendarPickerProps } from 'react-native-calendar-picker';

const CalendarPicker = (props: CalendarPickerProps) => {
  const [width, setWidth] = React.useState(0);

  function onLayout(event: LayoutChangeEvent) {
    setWidth(event.nativeEvent.layout.width);
  }
  return (
    <View style={styles.calendarView}>
      <View onLayout={onLayout} style={styling.measureWidth} />
      <RNCalendarPicker
        {...props}
        selectedDayStyle={styles.selectedDay}
        selectedDayTextColor={colors.white}
        selectedRangeStyle={styles.selectedRange}
        startFromMonday={!isUSCountry()}
        todayBackgroundColor="transparent"
        todayTextStyle={styles.today}
        width={Math.min(width, sizes.maxScreenWidth)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  calendarView: {
    backgroundColor: colors.backgroundTertiary,
    borderRadius: sizes.xs,
    padding: sizes.xs,
  },
  selectedDay: {
    backgroundColor: colors.lightBlueBrand,
  },
  selectedRange: {
    backgroundColor: colors.lightBlueBrand,
  },
  today: {
    color: colors.primary,
  },
});

export default CalendarPicker;
