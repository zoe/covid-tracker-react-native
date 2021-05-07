import React from 'react';
import { useSelector } from 'react-redux';
import { View } from 'react-native';

import { IFeaturedContent } from '@covid/core/content/dto/ContentAPIContracts';
import { RootState } from '@covid/core/state/root';
import { ExternalCallout } from '@covid/components/ExternalCallout';

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
  const home = useSelector<RootState, IFeaturedContent[]>((state) => state.content.featuredHome);
  const thankyou = useSelector<RootState, IFeaturedContent[]>((state) => state.content.featuredThankyou);

  const mapper = (item: IFeaturedContent) => (
    <View testID="featured-content-callout" key={item.slug}>
      <ExternalCallout
        link={item.link}
        calloutID={item.slug}
        imageSource={{ uri: item.thumbnail_image_url }}
        aspectRatio={item.thumbnail_aspect_ratio}
        screenName={screenName}
        disableLoadingState={disableLoadingState}
        orderIndex={item.order_index}
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
