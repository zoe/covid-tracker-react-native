import { BasicPage } from '@covid/components';
import NavigatorService from '@covid/NavigatorService';
import { styling } from '@covid/themes';
import React, { useRef } from 'react';
import { Linking } from 'react-native';
import WebView from 'react-native-webview';
import UrlParse from 'url-parse';

const js = `
  pageContents = document.getElementsByClassName("page-content");
  if (pageContents.length > 0) {
    blogWrappers = pageContents[0].getElementsByClassName("blog-wrapper");
    if (blogWrappers.length > 0) {
      document.body.appendChild(blogWrappers[0]);
      pageContents[0].remove();
    }
  }

  document.querySelectorAll('body > *').forEach((element) => {
    if (!element.classList.contains('page-content') && !element.classList.contains('blog-wrapper')) {
      element.remove();
    }
  });
`;

const uri = 'https://covid.joinzoe.com/post/full-results-of-our-mental-health-survey';
const url = new UrlParse(uri);
const source = { uri };

export default function MHPBlogPostScreen() {
  const webView = useRef<WebView>(null);
  return (
    <BasicPage
      active
      footerTitle="Close"
      onPress={() => NavigatorService.navigate('MentalHealthPlaybackRating')}
      style={styling.backgroundWhite}
    >
      <WebView
        injectedJavaScript={js}
        injectedJavaScriptBeforeContentLoaded={js}
        onLoadEnd={() => webView.current?.injectJavaScript(js)}
        onNavigationStateChange={(navState) => {
          try {
            const navUrl = new UrlParse(navState.url);
            if (navUrl.hostname !== url.hostname || navUrl.pathname !== url.pathname) {
              webView.current?.stopLoading();
              Linking.openURL(navState.url);
            }
          } catch (error) {
            // eslint-disable-next-line no-console
            console.warn(error);
          }
        }}
        ref={webView}
        source={source}
      />
    </BasicPage>
  );
}
