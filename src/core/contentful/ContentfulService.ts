import { injectable, inject } from 'inversify';
import Axios from 'axios';

import { Services } from '@covid/provider/services.types';
import appConfig from '@covid/appConfig';

import { IApiClient } from '../api/ApiClient';

export interface IContentfulService {
  getEntries(type: string): Promise<IContentfulEntryModel[]>;
  getThankYouModules(): Promise<IThankYouModuleModel[]>;
}

interface IContentfulItemModel {
  sys: IContentfulSysModel;
}

interface IContentfulSysModel {
  id: string;
  space?: IContentfulItemModel;
  type: string;
  linkType?: string;
  revision?: string;
  contentType?: IContentfulItemModel;
  locale?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IContentfulEntryModel extends IContentfulItemModel {
  fields: any;
}

interface IContentfulEntryResponseModel {
  sys: Partial<IContentfulSysModel>;
  total: number;
  skip: number;
  limit: number;
  items: IContentfulEntryModel[];
  includes?: {
    Asset?: IContentfulEntryModel[];
  };
}

interface IContentfulModel {
  id: FunctionStringCallback;
  contentType: string;
}

export interface IContentfulAssetModel extends IContentfulModel {
  file: any;
}

export interface IThankYouModuleModel extends IContentfulModel {
  calloutId: string;
  title: string;
  image: { id: string; url: string };
  link: string;
  orderIndex: number;
}

const ContentMapper = (item: IContentfulEntryModel, assets?: IContentfulAssetModel[], assetFieldKeys?: string[]) => {
  const result = {
    id: item.sys.id,
    contentType: item.sys.contentType?.sys.id,
    ...item.fields,
  };

  const ids = Object.keys(item.fields)
    .filter((key) => assetFieldKeys?.includes(key))
    .map((key) => {
      const fileUrl = assets?.find((asset) => asset.id === result[key].sys.id)?.file.url;
      return {
        key,
        id: item.fields[key].sys.id,
        url: fileUrl ? `https:${fileUrl}` : null,
        fileName: item.fields.fileName,
      };
    });

  ids.forEach((asset) => {
    result[asset.key] = {
      id: asset.id,
      url: asset.url,
    };
  });

  return result;
};

@injectable()
export class ContentfulService implements IContentfulService {
  private readonly env: string = 'master';

  constructor(@inject(Services.ContentfulApiClient) private apiClient: IApiClient) {
    const client = Axios.create({
      baseURL: appConfig.contentfulApiBaseUrl,
      responseType: 'json' as 'json',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 5 * 1000,
    });
    apiClient.setClient(client);
  }

  get basePath(): string {
    return `/spaces/${appConfig.contentfulSpace}/environments/${this.env}`;
  }

  async getEntries(type: string, assetKeys?: string[]): Promise<IContentfulEntryModel[]> {
    const response = await this.apiClient.get<IContentfulEntryResponseModel>(
      `${this.basePath}/entries?access_token=${appConfig.contentfulKey}&content_type=${type}`
    );
    const assets = response.includes?.Asset?.map((item) => ContentMapper(item));
    const items = response.items.map((item) => ContentMapper(item, assets, assetKeys));
    return items;
  }

  getThankYouModules(): Promise<IThankYouModuleModel[]> {
    return this.getEntries('thank-you-module', ['image']) as any;
  }
}
