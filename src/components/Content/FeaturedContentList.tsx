import { ExternalCallout } from '@covid/components/ExternalCallout';
import { IFeaturedContent } from '@covid/core/content/dto/ContentAPIContracts';
import { RootState } from '@covid/core/state/root';
import { Optional } from '@covid/utils/types';
import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

export enum FeaturedContentType {
  Home,
  ThankYou,
}

export type FeaturedContentProps = {
  type: FeaturedContentType;
  screenName: string;
  disableLoadingState?: boolean;
};

export const FeaturedContentList: React.FC<FeaturedContentProps> = ({ type, screenName, disableLoadingState }) => {
  const home = useSelector<RootState, Optional<IFeaturedContent[]>>((state) => state.content.featuredHome);
  const thankyou = useSelector<RootState, Optional<IFeaturedContent[]>>((state) => state.content.featuredThankyou);

  const mapper = (item: IFeaturedContent) => (
    <View key={item.slug} testID="featured-content-callout">
      <ExternalCallout
        aspectRatio={item.thumbnail_aspect_ratio}
        calloutID={item.slug}
        disableLoadingState={disableLoadingState}
        imageSource={{ uri: item.thumbnail_image_url }}
        link={item.link}
        orderIndex={item.order_index}
        screenName={screenName}
      />
    </View>
  );

  const content = () => {
    switch (type) {
      case FeaturedContentType.Home:
        return home?.map(mapper);
      case FeaturedContentType.ThankYou:
        return thankyou?.map(mapper);
      default:
        return null;
    }
  };

  return <>{content()}</>;
};
