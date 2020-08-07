import { injectable, inject } from 'inversify';
import Axios from 'axios';
import { WEBFLOW_KEY } from 'react-native-dotenv';

import { Services } from '@covid/provider/services.types';
import appConfig from '@covid/appConfig';
import { IApiClient } from '@covid/core/api/ApiClient';
import { camelizeKeys } from '@covid/core/api/utils';
import { IWebflowCollectionModel, IWebflowBlogModel } from '@covid/core/content/WebflowModels.interfaces';

export interface IWebflowService {
  getCollectionId(name: string): Promise<string | undefined>;
  getCollectionItems<T>(id: string): Promise<T[]>;
  getUKBlogPosts(): Promise<IWebflowBlogModel[]>;
}

@injectable()
export class WebflowService implements IWebflowService {
  private readonly siteId: string = '';
  private readonly env: string = 'master';

  constructor(@inject(Services.WebflowApiClient) private apiClient: IApiClient) {
    const client = Axios.create({
      baseURL: 'https://api.webflow.com',
      responseType: 'json',
      headers: {
        authorization: `Bearer ${WEBFLOW_KEY}`,
        'accept-version': '1.0.0',
        'Content-Type': 'application/json',
      },
      timeout: 5 * 1000,
    });
    // apiClient.setClient(client);
  }

  async getCollectionId(slug: string): Promise<string | undefined> {
    const response = await this.apiClient.get<IWebflowCollectionModel[]>(`/${this.siteId}/collections`);
    return response.find((item) => item.slug === slug)?._id;
  }

  async getCollectionItems<T>(id: string): Promise<T[]> {
    const { items } = await this.apiClient.get<{ items: T[] }>(`/collections/${id}/items`);
    return camelizeKeys(items);
  }

  async getUKBlogPosts() {
    const id = await this.getCollectionId('uk-data');
    if (id) {
      return [];
    }
    return await this.getCollectionItems<IWebflowBlogModel>(id!);
  }
}
