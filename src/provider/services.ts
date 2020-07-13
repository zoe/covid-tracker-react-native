import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';

import ApiClient, { IApiClient } from '@covid/core/api/ApiClient';
import { IContentApiClient, ContentApiClient } from '@covid/core/content/ContentApiClient';
import ContentService, { IContentService } from '@covid/core/content/ContentService';
import UserService, { ICoreService } from '@covid/core/user/UserService';
import { IDietStudyRemoteClient, DietStudyApiClient } from '@covid/core/diet-study/DietStudyApiClient';

import { Services } from './services.types';

export const container = new Container();

container.bind<IApiClient>(Services.Api).to(ApiClient).inSingletonScope();

container.bind<ICoreService>(Services.User).to(UserService).inSingletonScope();

container.bind<IContentApiClient>(Services.ContentApi).to(ContentApiClient).inSingletonScope();

container.bind<IContentService>(Services.Content).to(ContentService).inSingletonScope();

container.bind<IDietStudyRemoteClient>(Services.DietStudy).to(DietStudyApiClient).inSingletonScope();

export const { lazyInject } = getDecorators(container);
