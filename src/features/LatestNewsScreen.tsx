import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { notificationReminders } from '@assets';
import { ExternalCallout } from '@covid/components/ExternalCallout';
import PushNotificationService, { IPushTokenEnvironment } from '@covid/core/push-notifications/PushNotificationService';
import ExpoPushTokenEnvironment from '@covid/core/push-notifications/expo';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { useInjection } from '@covid/provider/services.hooks';
import { IWebflowService } from '@covid/core/content/WebflowClient';
import { Services } from '@covid/provider/services.types';
import { IWebflowBlogModel } from '@covid/core/content/WebflowModels.interfaces';
import { NewsCard } from '@covid/components/Cards/NewsCard';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'DietStudyThankYou'>;
  route: RouteProp<ScreenParamList, 'DietStudyThankYou'>;
};

export const LatestNewsScreen: React.FC<Props> = (props) => {
  const pushService: IPushTokenEnvironment = new ExpoPushTokenEnvironment();
  const webflowService = useInjection<IWebflowService>(Services.WebflowService);

  const [shouldShowReminders, setShowReminder] = useState(false);
  pushService.isGranted().then((result) => {
    setShowReminder(result);
  });

  const [posts, setPosts] = useState<IWebflowBlogModel[]>([]);

  const header: () => React.ReactElement | null = () => {
    return shouldShowReminders ? (
      <View style={{ marginHorizontal: 8 }}>
        <ExternalCallout
          link=""
          calloutID="notificationReminders"
          imageSource={notificationReminders}
          aspectRatio={1244.0 / 368.0}
          screenName={props.route.name}
          action={() => {
            PushNotificationService.openSettings();
          }}
        />
      </View>
    ) : null;
  };

  useEffect(() => {
    (async () => {
      setPosts(await webflowService.getUKBlogPosts());
    })();
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        data={posts}
        ListHeaderComponent={header()}
        keyExtractor={(item) => item.slug}
        renderItem={({ item }) => <NewsCard model={item} />}
      />
    </SafeAreaView>
  );
};
