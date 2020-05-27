import * as AvatarImages from '@assets';

export type AvatarName =
  | 'profile1'
  | 'profile2'
  | 'profile3'
  | 'profile4'
  | 'profile5'
  | 'profile6'
  | 'profile7'
  | 'profile8'
  | 'profile9'
  | 'profile10';
const DEFAULT_PROFILE = 'profile10';

export const getAvatarByName = (name: AvatarName) => {
  return AvatarImages[name] || AvatarImages[DEFAULT_PROFILE];
};
