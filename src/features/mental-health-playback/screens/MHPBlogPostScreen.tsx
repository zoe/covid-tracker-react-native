import React, { useRef } from 'react';
import WebView from 'react-native-webview';

import NavigatorService from '@covid/NavigatorService';
import { BasicPage } from '@covid/components';
import { styling } from '@covid/themes';

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

const source = { uri: 'https://covid.joinzoe.com/post/covid-estimates-revised-after-change-to-methodology' };

export default function MHPBlogPostScreen() {
  const webView = useRef<WebView>(null);
  return (
    <BasicPage
      active
      style={styling.backgroundWhite}
      footerTitle="Close"
      onPress={() => NavigatorService.navigate('MentalHealthPlaybackRating')}>
      <WebView
        injectedJavaScript={js}
        injectedJavaScriptBeforeContentLoaded={js}
        onLoadEnd={() => webView.current?.injectJavaScript(js)}
        ref={webView}
        source={source}
      />
    </BasicPage>
  );
}
