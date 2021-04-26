import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { DailyTriggerInput } from 'expo-notifications';

import { HeaderText, RegularText, RegularBoldText, SecondaryText } from '@covid/components/Text';
import { ActionButton, BackButton } from '@covid/components';
import { Header } from '@covid/components/Screen';
import i18n from '@covid/locale/i18n';
import { colors } from '@theme';
import DropdownIcon from '@assets/icons/DropdownIcon';
import { selectSettings } from '@covid/core/state';
import { ISubscribedSchoolGroupStats } from '@covid/core/schools/Schools.dto';
import { Optional } from '@covid/utils/types';
import { RootState } from '@covid/core/state/root';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import { Button } from '@covid/components/buttons/Button';

import { ScreenParamList } from '../ScreenParamList';

interface ILocalNotificationMEssage {
  title: string;
  body: string;
}

const DEFAULT_MESSAGE: ILocalNotificationMEssage = {
  title: 'Report how you are feeling',
  body: "It's time to let us know how you are feeling!",
};

interface IProps {
  navigation: DrawerNavigationProp<ScreenParamList>;
  route: RouteProp<ScreenParamList, 'Dashboard'>;
}

export function UserSettingsScreen({ navigation, route }: IProps) {
  const settings = useSelector(selectSettings);

  const [reminderDateTime, setReminderDateTime] = useState<Date | null>(null);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [reminderEnabled, setReminderEnabled] = useState<boolean>(true);
  const [customMessage, setCustomMessage] = useState<ILocalNotificationMEssage>(DEFAULT_MESSAGE);

  function handleSetTime(date: Date) {
    setReminderDateTime(date);
    setShowTimePicker(false);
  }

  const networks = useSelector<RootState, Optional<ISubscribedSchoolGroupStats[]>>(
    (state) => state.school.joinedSchoolGroups
  );
  const askPermissions = async () => {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      return false;
    }
    return true;
  };

  const sendNotificationImmediately = async () => {
    const notificationId = await Notifications.presentNotificationAsync(customMessage);
  };

  const scheduleNotification = async () => {
    const dailyTriggerInput: DailyTriggerInput = {
      hour: 11, //reminderDateTime.getHours(),
      minute: 19, //reminderDateTime.getMinutes(),
      repeats: true,
    };
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: customMessage,
      trigger: dailyTriggerInput,
    });
  };

  const toggleSwitch = (value: boolean) => {
    setReminderEnabled(!reminderEnabled);
  };

  useEffect(() => {
    (async () => {
      askPermissions();
    })();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.rootContainer}>
          <View style={styles.navContainer}>{!!navigation && <BackButton navigation={navigation} />}</View>

          <Header>
            <HeaderText style={{ marginTop: 16, marginBottom: 32 }}>{i18n.t('user-settings-reminder')}</HeaderText>

            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <RegularBoldText style={{ marginBottom: 32 }}>
                Reminder {reminderEnabled ? 'on' : 'off'}:{' '}
              </RegularBoldText>
              <Switch
                trackColor={{ false: '#767577', true: colors.green }}
                thumbColor={colors.lightBrand}
                ios_backgroundColor={colors.backgroundTertiary}
                onValueChange={toggleSwitch}
                value={reminderEnabled}
              />
            </View>

            {reminderEnabled && (
              <>
                <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                  <RegularBoldText>Daily checkup reminder time:</RegularBoldText>
                  <RegularText style={styles.fakeInput}>
                    {reminderDateTime ? moment(reminderDateTime).format('H:m') : 'Not set'}
                  </RegularText>
                </TouchableOpacity>

                <RegularBoldText>Title:</RegularBoldText>

                <ValidatedTextInput
                  placeholder="Daily reminder title"
                  value={customMessage.title}
                  onChangeText={(value) =>
                    setCustomMessage({
                      ...customMessage,
                      title: value,
                    })
                  }
                />

                <RegularBoldText>Message:</RegularBoldText>
                <ValidatedTextInput
                  placeholder="Daily reminder content"
                  value={customMessage.body}
                  onChangeText={(value) =>
                    setCustomMessage({
                      ...customMessage,
                      body: value,
                    })
                  }
                />

                <Button onPress={sendNotificationImmediately}>Test Reminder</Button>
                <Button onPress={scheduleNotification} branded>
                  Save Reminder
                </Button>
              </>
            )}

            {showTimePicker ? (
              <DateTimePickerModal
                isVisible={showTimePicker}
                headerTextIOS={i18n.t('covid-test.question-pick-a-time')}
                mode="time"
                onConfirm={handleSetTime}
                onCancel={() => setShowTimePicker(false)}
              />
            ) : null}
          </Header>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },

  rootContainer: {
    padding: 10,
  },

  navContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 8,
  },

  menuToggle: {
    tintColor: colors.primary,
    marginTop: 22,
  },

  fakeInput: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 16,
  },
});
