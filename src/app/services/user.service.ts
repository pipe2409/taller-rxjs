import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { switchMap, map, forkJoin, of, Observable } from 'rxjs';
import { User } from '../modelo/user';
import { Post } from '../modelo/post';
import { Comentario } from '../modelo/comentario';

export interface UserProfileData {
  user: User;
  posts: Post[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private api: ApiService) {}

  buscarUsuarioCompleto(username: string): Observable<UserProfileData | null> {
    return this.api.getUserByUsername(username).pipe(
      switchMap((res: { users: User[] }) => {
        const user = res.users[0];

        if (!user) {
          return of(null);
        }

        return this.api.getPostsByUserId(user.id).pipe(
          switchMap((postsRes: { posts: Post[] }) => {
            const posts = postsRes.posts;

            if (!posts.length) {
              return of({
                user,
                posts: []
              });
            }

            const postsConComentarios$ = posts.map((post: Post) => {
              return this.api.getCommentsByPostId(post.id).pipe(
                switchMap((commentsRes: { comments: Comentario[] }) => {
                  const comments = commentsRes.comments;

                  if (!comments.length) {
                    return of({
                      ...post,
                      comments: []
                    });
                  }

                  const commentsConNombre$ = comments.map((comment: Comentario) =>
                    this.api.getUserById(comment.user.id).pipe(
                      map((commentUser: User) => ({
                        ...comment,
                        user: {
                          ...comment.user,
                          fullName: `${commentUser.firstName} ${commentUser.lastName}`
                        }
                      }))
                    )
                  );

                  return forkJoin(commentsConNombre$).pipe(
                    map((commentsConNombre: Comentario[]) => ({
                      ...post,
                      comments: commentsConNombre
                    }))
                  );
                })
              );
            });

            return forkJoin(postsConComentarios$).pipe(
              map((postsConComentarios: Post[]) => ({
                user,
                posts: postsConComentarios
              }))
            );
          })
        );
      })
    );
  }
}