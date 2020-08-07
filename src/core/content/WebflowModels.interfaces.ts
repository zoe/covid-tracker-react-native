export interface IWebflowCollectionModel {
  _id: string;
  lastUpdated: string;
  createdOn: string;
  name: string;
  slug: string;
}

export interface IWebflowFileModel {
  fileId: string;
  url: string;
  alt?: string;
}

export interface IWebflowBlogModel {
  cid: string;
  id: string;
  archived: boolean;
  draft: boolean;
  featureInUkDataPage: boolean;
  featureInUkHomePage: boolean;
  publishedDate: string;
  name: string;
  slug: string;
  thumbnailImage?: IWebflowFileModel;
  mainImage?: IWebflowFileModel;
  updatedOn: string;
  createdOn: string;
  publishedOn: string;
}
