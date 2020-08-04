import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from 'native-base';
import React, { Component, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { blog006, dataPage003, incidence009, notificationReminders, timUpdate004 } from '@assets';
import { colors } from '@theme';
import { AppRating, shouldAskForRating } from '@covid/components/AppRating';
import { ExternalCallout } from '@covid/components/ExternalCallout';
import InviteToStudy from '@covid/components/InviteToStudy';
import { Header } from '@covid/components/Screen';
import { ShareAppCard } from '@covid/components/Cards/ShareApp';
import { BrandedButton, ClickableText, Header3Text, HeaderText, RegularText } from '@covid/components/Text';
import { lazyInject } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';
import { ICoreService } from '@covid/core/user/UserService';
import i18n from '@covid/locale/i18n';
import PushNotificationService, { IPushTokenEnvironment } from '@covid/core/push-notifications/PushNotificationService';
import ExpoPushTokenEnvironment from '@covid/core/push-notifications/expo';
import Donate from '@covid/components/Donate';
import { useInjection } from '@covid/provider/services.hooks';

import { ScreenParamList } from '../ScreenParamList';

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
                action={() => {
                  PushNotificationService.openSettings();
                }}
              />
            )}

            <Header3Text style={styles.titleText}>{i18n.t('latest-news.title')}</Header3Text>

            <ExternalCallout
              link="https://www.youtube.com/watch?v=zToStOETP00"
              calloutID="tim_update_004"
              imageSource={timUpdate004}
              aspectRatio={1.178}
            />

            <ExternalCallout
              link="https://covid.joinzoe.com/post/covid-donations?utm_source=App"
              calloutID="blog_006"
              imageSource={blog006}
              aspectRatio={1.551}
            />

            <ExternalCallout
              link="https://covid.joinzoe.com/data#daily-new-cases?utm_source=App"
              calloutID="incidence_009"
              imageSource={incidence009}
              aspectRatio={1.5}
            />

            <ExternalCallout
              link="https://covid.joinzoe.com/your-contribution?utm_source=App"
              calloutID="data_page_003"
              imageSource={dataPage003}
              aspectRatio={1.55}
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
