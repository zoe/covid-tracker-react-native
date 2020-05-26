import { gbFlag, svFlag, usFlag } from '@assets';
import { isGBCountry, isSECountry } from '@covid/core/user/UserService';

export const getLocaleFlagIcon = () => {
  if (isGBCountry()) {
    return gbFlag;
  }
  if (isSECountry()) {
    return svFlag;
  }
  return usFlag;
};
