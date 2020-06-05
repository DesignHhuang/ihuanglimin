import { User } from './user'
export interface Article {
  id: number;
  content?: string;
  likesum?: number;
  commentsum?: number;
  isdeleted?: boolean;
  creator: User;
  createdAt?: Date;
}

export interface Comment {
  id: number;
  content?: string;
  isdeleted?: boolean;
  article?: Article;
  creator: User;
  createdAt?: Date;
}

export interface Reply {
  id: number;
  content?: string;
  isdeleted?: boolean;
  comment?: Comment;
  creator: User;
  createdAt?: Date;
}

export interface Zan {
  id: number;
  type_id?: number;
  type?: String;
  isdeleted?: boolean;
  creator: User;
  createdAt?: Date;
}
