import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { blog010, dataPage003, notificationReminders, timUpdate008 } from '@assets';
import { colors } from '@theme';
import { ExternalCallout } from '@covid/components/ExternalCallout';
import { ShareAppCard } from '@covid/components/Cards/ShareApp';
import { Header3Text } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import PushNotificationService, { IPushTokenEnvironment } from '@covid/core/push-notifications/PushNotificationService';
import ExpoPushTokenEnvironment from '@covid/core/push-notifications/expo';
import { ScreenParamList } from '@covid/features/ScreenParamList';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'DietStudyThankYou'>;
  route: RouteProp<ScreenParamList, 'DietStudyThankYou'>;
};

export const LatestNewsScreen: React.FC<Props> = (props) => {
  const pushService: IPushTokenEnvironment = new ExpoPushTokenEnvironment();

  const [shouldShowReminders, setShowReminder] = useState(false);
  pushService.isGranted().then((result) => {
    setShowReminder(result);
  });

  return (
    <>
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.rootContainer}>
            {shouldShowReminders && (
              <ExternalCallout
                link=""
                calloutID="notificationReminders"
                imageSource={notificationReminders}
                aspectRatio={1244.0 / 368.0}
                screenName={props.route.name}
                postClicked={() => {
                  PushNotificationService.openSettings();
                }}
              />
            )}

            <Header3Text style={styles.titleText}>{i18n.t('latest-news.title')}</Header3Text>

            <ExternalCallout
              link="https://covid.joinzoe.com/post/covid-on-the-rise?utm_source=App"
              calloutID="blog_010"
              imageSource={blog010}
              aspectRatio={1.552}
              screenName={props.route.name}
            />

            <ExternalCallout
              link="https://youtu.be/UUwPmakoumQ"
              calloutID="tim_update_008"
              imageSource={timUpdate008}
              aspectRatio={1.178}
              screenName={props.route.name}
            />

            <ExternalCallout
              link="https://covid.joinzoe.com/your-contribution?utm_source=App"
              calloutID="data_page_003"
              imageSource={dataPage003}
              aspectRatio={1.55}
              screenName={props.route.name}
            />

            <ShareAppCard />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  titleText: {
    marginTop: 32,
    marginHorizontal: 10,
    color: colors.textDark,
  },
  content: {
    marginVertical: 32,
    marginHorizontal: 18,
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  rootContainer: {
    alignSelf: 'center',
    padding: 10,
  },
});
