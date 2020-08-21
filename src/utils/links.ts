import { Linking } from 'react-native';

export const openExternalLink = (link: string) => {
  Linking.openURL(link);
};
