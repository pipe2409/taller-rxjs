import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // 👈 agregar este import

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserPostsComponent } from './components/user-posts/user-posts.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserInfoComponent,
    UserPostsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }