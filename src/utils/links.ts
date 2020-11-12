import * as WebBrowser from 'expo-web-browser';

import Analytics, { events } from '@covid/core/Analytics';

export const openWebLink = (link: string) => {
  Analytics.track(events.LINK_OPENED, { link });
  WebBrowser.openBrowserAsync(link);
};
