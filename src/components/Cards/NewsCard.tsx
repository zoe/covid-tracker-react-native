import React from 'react';
import { Linking, Image, View, StyleSheet } from 'react-native';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { IWebflowBlogModel } from '@covid/core/content/WebflowModels.interfaces';
import { useInjection } from '@covid/provider/services.hooks';
import { IWebflowService } from '@covid/core/content/WebflowClient';
import { Services } from '@covid/provider/services.types';
import { Header3Text, CaptionText } from '@covid/components/Text';
import { colors } from '@theme';

type Props = {
  model: IWebflowBlogModel;
};

export const NewsCard: React.FC<Props> = ({ model }) => {
  const webflowService = useInjection<IWebflowService>(Services.WebflowService);
  const onPress = () => Linking.openURL(webflowService.getUKBlogPostUrl(model.slug));
  const displayDate = (): string => moment(model.publishedDate).format('MMMM DD, YYYY');

  return (
    <TouchableOpacity onPress={onPress} style={styles.root}>
      <Image source={{ uri: model.mainImage?.url }} style={styles.image} />
      <View style={styles.textContainer}>
        <Header3Text style={styles.titleLabel}>{model.name}</Header3Text>
        <CaptionText>{displayDate()}</CaptionText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 16,
    backgroundColor: colors.white,
    overflow: 'hidden',
  },

  image: {
    height: 240,
    resizeMode: 'cover',
    overflow: 'hidden',
  },

  textContainer: {
    margin: 16,
    paddingHorizontal: 0,
  },

  titleLabel: {
    fontWeight: '500',
    marginBottom: 8,
  },
});
