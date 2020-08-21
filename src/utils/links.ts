import { Linking } from 'react-native';

import Analytics, { events } from '@covid/core/Analytics';

export const openExternalLink = (link: string) => {
  Analytics.track(events.LINK_OPENED, { link });
  Linking.openURL(link);
};
