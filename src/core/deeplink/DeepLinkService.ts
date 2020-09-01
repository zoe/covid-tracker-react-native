import { injectable } from 'inversify';
import { Platform } from 'react-native';
import * as Linking from 'expo-linking';
import { parse, build } from 'search-params';

import NavigatorService from '@covid/NavigatorService';

export interface IDeepLinkService {
  initialUrl?: string;

  canHandle(url: string): boolean;
  handle(url: string);

  listen(): void;
  unListen(): void;
  getQueryParams(url: string): object | null;
  makeUrl(param?: object): string;
}

export enum DeepLinkType {
  inviteSchool,
  privacy,
}

@injectable()
export class DeepLinkService implements IDeepLinkService {
  public initialUrl: string = null;

  private readonly accept = ['/invite/school', '/privacy', '/CountrySelect'];

  constructor() {
    this.bootstrap();
  }

  private bootstrap() {
    Linking.getInitialURL().then((url) => this.handleInitialURL(url));
  }

  public canHandle(url: string): boolean {
    return this.accept.map((path) => url.includes(path)).includes(true);
  }

  public handle(url: string) {
    const { path, queryParams } = Linking.parse(url);
    console.log(`Linked to app with path: ${path} and data: ${JSON.stringify(queryParams)}`);

    // TOOD: Fix this hack
    setTimeout(() => {
      NavigatorService.replace(path, queryParams);
    }, 1000);
  }

  // Helper

  public getQueryParams(url: string): any | null {
    if (!url.includes('?')) return null;
    try {
      const { path, queryParams } = Linking.parse(url);
      return queryParams;
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
        case DeepLinkType.privacy:
          return '/PrivacyPolicyUK';
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
    Linking.addEventListener('url', this.handleOpenURLEvent);
  }

  public unListen() {
    Linking.removeEventListener('url', this.handleOpenURLEvent);
  }

  // App cycle handlers

  private handleOpenURLEvent: Linking.URLListener = (event) => {
    this.handle(event.url);
    console.log('[DeepLinkService] handleOpenURL', event);
  };

  private handleInitialURL = (url: string | null) => {
    this.initialUrl = url;
    console.log('[DeepLinkService] handleInitialURL', url);
  };
}
