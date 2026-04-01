//dummy no devuelve directamente un arreglo simple, sino objetos tipo {users, posts, comments}

import { User } from './user';
import { Post } from './post';
import { Comentario } from './comentario';

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export interface PostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

export interface CommentsResponse {
  comments: Comentario[];
  total: number;
  skip: number;
  limit: number;
}