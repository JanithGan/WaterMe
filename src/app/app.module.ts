import { NgModule } from '@angular/core';
import { environment } from './../environments/environment';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { DataService } from './services/data.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { DataFormComponent } from './data-form/data-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DataFormComponent,
    LoginComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'form', component: DataFormComponent }
    ]),
  ],

  providers: [
    DataService, 
    AuthService, 
    UserService
  ],

  bootstrap: [AppComponent]

})

export class AppModule { }
