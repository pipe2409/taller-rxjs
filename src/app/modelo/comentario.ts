export interface Comentario {
  id: number;
  postId: number;
  body: string;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
}
