import { injectable } from 'inversify';
import { Platform } from 'react-native';
import * as Linking from 'expo-linking';
import { parse, build } from 'search-params';

export interface IDeepLinkService {
  canHandle(url: string): boolean;
  listen(): void;
  unListen(): void;
  getQueryParams(url: string): object | null;
  makeUrl(param?: object): string;
}

export enum DeepLinkType {
  inviteSchool,
}

@injectable()
export class DeepLinkService implements IDeepLinkService {
  private readonly accept = ['/invite/school'];

  constructor() {
    this.bootstrap();
  }

  private bootstrap() {
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(this.handleInitialURL);
    }
  }

  public canHandle(url: string): boolean {
    return this.accept.map((path) => url.includes(path)).includes(true);
  }

  // Helper

  public getQueryParams(url: string): any | null {
    if (!url.includes('?')) return null;
    try {
      return parse(url.split('?')[1]);
    } catch (_) {
      return null;
    }
  }

  public makeUrl(type: DeepLinkType, param?: object): string | null {
    const queryString = build(param ?? '').toString();
    const getPath = (): string | null => {
      switch (type) {
        case DeepLinkType.inviteSchool:
          return '/invite/school';
        default:
          return null;
      }
    };
    const path = getPath();
    const urlPath = path ? (queryString ? `${path}?${queryString}` : path) : null;
    return Linking.makeUrl(urlPath);
  }

  // App cycle hooks

  public listen() {
    if (Platform.OS !== 'android') return;
    Linking.addEventListener('url', this.handleOpenURLEvent);
  }

  public unListen() {
    if (Platform.OS !== 'android') return;
    Linking.removeEventListener('url', this.handleOpenURLEvent);
  }

  // App cycle handlers

  private handleOpenURLEvent: Linking.URLListener = (event) => {
    console.log('handleOpenURL', event);
  };

  private handleInitialURL = (url: string | null) => {
    console.log('[DeepLinkService] handleInitialURL', url);
  };
}
