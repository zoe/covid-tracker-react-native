import * as React from 'react';
import NativeWebView, { WebViewMessageEvent, WebViewProps } from 'react-native-webview';

interface IProps extends WebViewProps {
  onEvent?: (type: string, payload?: object) => void;
}

export class WebView extends React.Component<IProps, object> {
  private webview: NativeWebView | null;

  render() {
    // 19 Dec 2021: Set the minHeight, Opacity, and androidLayerType to avoid WebView crash:
    // https://github.com/react-native-webview/react-native-webview/issues/1069
    return (
      <NativeWebView
        {...this.props}
        androidLayerType="software"
        automaticallyAdjustContentInsets={false}
        onMessage={this.onMessage}
        ref={this.refWebView}
        style={{ minHeight: 1, opacity: 0.99 }}
      />
    );
  }

  refWebView = (webview: NativeWebView) => {
    this.webview = webview;
  };

  public onMessage = (event: WebViewMessageEvent) => {
    const { data: stringData } = event.nativeEvent;
    const data = JSON.parse(stringData);
    if (this.props.onEvent && data.type && data.data) {
      this.props.onEvent(data.type, data.data);
    }
  };

  public call(fnName: string, eventData: any) {
    this.webview!.injectJavaScript(`window.covid.${fnName}(${JSON.stringify(eventData)})`);
  }
}
