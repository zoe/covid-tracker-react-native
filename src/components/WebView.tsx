import { EventEmitter } from 'events';

import React, { Component } from 'react';
import NativeWebView, { WebViewProps } from 'react-native-webview';

const RN_MESSAGES_CHANNEL_PREFIX = 'f251c210-e7c9-42fa-bae3-b9352ec3722a';

interface Props extends WebViewProps {}

export class WebView extends Component<Props, object> {
  private readonly messagesChannel = new EventEmitter();
  private webview: NativeWebView | null;

  render() {
    return <NativeWebView {...this.props} onMessage={this.onMessage} ref={this._refWebView} />;
  }

  _refWebView = (webview: NativeWebView) => {
    this.webview = webview;
  };

  public onMessage = (event: any) => {
    const { data } = event.nativeEvent;

    if (data.indexOf(RN_MESSAGES_CHANNEL_PREFIX) !== 0) {
      return; // that's not something that was received from rn messages channel
    }

    // remove the unique identifier so that only the user's original message
    // remains
    const jsonString = data.replace(RN_MESSAGES_CHANNEL_PREFIX, '');

    // parse original message into an object
    const parsedMsg = JSON.parse(jsonString);

    switch (parsedMsg.type) {
      case 'json':
        this.messagesChannel.emit('json', parsedMsg.payload);
        break;
      case 'text':
        this.messagesChannel.emit('text', parsedMsg.payload);
        break;
      case 'event':
        this.messagesChannel.emit(parsedMsg.meta.eventName, parsedMsg.payload);
        break;
    }
  };

  public send(string: string) {
    this.webview!.injectJavaScript(`(function (global) {
      global.RNMessagesChannel && global.RNMessagesChannel.emit('text', ${JSON.stringify(string)}, true);
    })(window)`);
  }

  public sendJSON(json: any) {
    this.webview!.injectJavaScript(`(function (global) {
      global.RNMessagesChannel && global.RNMessagesChannel.emit('json', ${JSON.stringify(json)}, true);
    })(window)`);
  }

  public emit(eventName: any, eventData: any) {
    this.webview!.injectJavaScript(`(function (global) {
      global.RNMessagesChannel && global.RNMessagesChannel.emit(${JSON.stringify(eventName)}, ${JSON.stringify(
      eventData
    )}, true);
    })(window)`);
  }
}
