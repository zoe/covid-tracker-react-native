import React, { Component } from 'react';
import NativeWebView, { WebViewProps, WebViewMessageEvent } from 'react-native-webview';

interface Props extends WebViewProps {
  onEvent?: (type: string, payload?: object) => void;
}

export class WebView extends Component<Props, object> {
  private webview: NativeWebView | null;

  render() {
    return <NativeWebView {...this.props} onMessage={this.onMessage} ref={this.refWebView} />;
  }

  refWebView = (webview: NativeWebView) => {
    this.webview = webview;
  };

  public onMessage = (event: WebViewMessageEvent) => {
    const { data: stringData } = event.nativeEvent;
    const data = JSON.parse(stringData);
    if (this.props.onEvent && data['type'] && data['data']) {
      this.props.onEvent(data.type, data.data);
    }
  };

  public call(fnName: string, eventData: any) {
    this.webview!.injectJavaScript(`window.covid.${fnName}(${JSON.stringify(eventData)})`);
  }
}
