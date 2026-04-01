import { Component } from '@angular/core';
import { User } from './modelo/user';
import { Post } from './modelo/post';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  username: string = '';
  user: User | null = null;
  posts: Post[] = [];
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private userService: UserService) {}

  onSearch(username: string): void {
    this.username = username;
    this.searchUser();
  }

  searchUser(): void {
    const usernameTrimmed = this.username.trim();

    if (!usernameTrimmed) {
      this.user = null;
      this.posts = [];
      this.errorMessage = 'Por favor ingrese un username.';
      this.loading = false;
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.user = null;
    this.posts = [];

    this.userService.buscarUsuarioCompleto(usernameTrimmed).subscribe({
      next: (result: { user: User; posts: Post[] } | null) => {
        if (!result) {
          this.errorMessage = 'El usuario no existe.';
          this.loading = false;
          return;
        }

        this.user = result.user;
        this.posts = result.posts;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Ocurrió un error al consultar la API.';
        this.loading = false;
      }
    });
  }
}