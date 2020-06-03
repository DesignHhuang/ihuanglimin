export interface User {
  id: number;
  email?: string;
  password: string;
  fullname?: string;
  nickname?: string;
  mobile: string;
  avatar?: string;
  signature?: string;
  title?: string;
  org_group?: string;
  tagList?: Tag[];
  country?: string;
  address?: string;
  profile?: string;
  isdeleted?: boolean;
  roleList?: Role[];
  createdAt?: Date;
}

export interface Tag {
  id: number;
  tagname?: string;
  isdeleted?: boolean;
  createdAt?: Date;
}

export interface Role {
  id: number;
  role?: string;
  isdeleted?: boolean;
  createdAt?: Date;
}

