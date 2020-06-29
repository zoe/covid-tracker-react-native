import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';

import ApiClient, { IApiClient } from '../core/api/ApiClient';
import { IContentApiClient, ContentApiClient } from '../core/content/ContentApiClient';
import ContentService, { IContentService } from '../core/content/ContentService';
import UserService, { ICoreService } from '../core/user/UserService';

import { Services } from './services.types';

export const container = new Container();

container.bind<IApiClient>(Services.Api).to(ApiClient).inSingletonScope();

container.bind<ICoreService>(Services.User).to(UserService).inSingletonScope();

container.bind<IContentApiClient>(Services.ContentApi).to(ContentApiClient).inSingletonScope();

container.bind<IContentService>(Services.Content).to(ContentService).inSingletonScope();

export const { lazyInject } = getDecorators(container);
