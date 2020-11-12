import { gbFlag, svFlag, usFlag } from '@assets';
import { isGBCountry, isSECountry } from '@covid/core/localisation/LocalisationService';

export const getLocaleFlagIcon = () => {
  if (isGBCountry()) {
    return gbFlag;
  }
  if (isSECountry()) {
    return svFlag;
  }
  return usFlag;
};
