import React from 'react';

import { IThankYouModuleModel } from '@covid/core/contentful/ContentfulService';
import { isSECountry } from '@covid/core/user/UserService';
import { ExternalCallout } from '@covid/components/ExternalCallout';

interface ContentfulThankYouModuleProps extends IThankYouModuleModel {
  action?: VoidFunction;
}

export const ContentfulThankYouModule: React.FC<ContentfulThankYouModuleProps> = ({
  link,
  calloutId,
  image,
  aspectRatio,
  visible,
  ...props
}) => {
  const imageSource = { uri: image.url };

  if (isSECountry()) {
    imageSource.uri = props.imageSe?.url ?? image.url;
  }

  if (visible === true) {
    return (
      <ExternalCallout
        link={link}
        calloutID={calloutId}
        imageSource={imageSource}
        aspectRatio={aspectRatio}
        {...props}
      />
    );
  }
  return null;
};
