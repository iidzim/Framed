export interface IAuthor {
  name: string;
  username: string;
  avatar: string;
}

export interface IPicture {
  id: string;
  url: string;
  alt: string;
  date: string;
  title: string;
  description?: string;
  author: IAuthor;
}
