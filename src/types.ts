export interface TableColumn<T> {
  key: string;
  title: string;
  render?: (value: T[keyof T], row: T) => JSX.Element;
  width?: string | number;
}

export type RowData = UserData;

export interface UserData {
  rank: string;
  avatar: string;
  username: string;
  impressions: number;
  posts: number;
  comments: number;
  reTweets: number;
  tgMsgs: number;
}
