import React from 'react';
import { useSelector } from 'react-redux';

import { IFeaturedContent } from '@covid/core/content/dto/ContentAPIContracts';
import { RootState } from '@covid/core/state/root';
import { ExternalCallout } from '@covid/components/ExternalCallout';
import { Optional } from '@covid/utils/types';

export enum FeaturedContentType {
  Home,
  ThankYou,
}

export type FeaturedContentProps = {
  type: FeaturedContentType;
  screenName: string;
};

export const FeaturedContentList: React.FC<FeaturedContentProps> = ({ type, screenName }) => {
  const home = useSelector<RootState, Optional<IFeaturedContent[]>>((state) => state.content.featuredHome);

  const thankyou = useSelector<RootState, Optional<IFeaturedContent[]>>((state) => state.content.featuredThankyou);

  const mapper = (item: IFeaturedContent) => (
    <ExternalCallout
      key={item.link}
      link={item.link}
      calloutID={item.slug}
      imageSource={{ uri: item.thumbnail_image_url }}
      aspectRatio={1029 / 600}
      screenName={screenName}
    />
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
