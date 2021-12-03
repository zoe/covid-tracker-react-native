export type TMediaContentItem = {
  content_type: 'blog' | 'video';
  date_added: string;
  date_published: string;
  description: string;
  id: string;
  tags: string[];
  url: string;
  title: string;
};

export type TStateMediaCentre = {
  contentItems: TMediaContentItem[];
};
