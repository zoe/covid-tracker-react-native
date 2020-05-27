import { ApiClientBase } from './api/ApiClientBase';

type Link = {
  title: string;
  url: string;
};

export type CalloutBoxContent = {
  title: string;
  description: string;
  link: Link;
};

export interface IContentService {
  getUserCount(): number;
  getWelcomeContent(): CalloutBoxContent;
}
