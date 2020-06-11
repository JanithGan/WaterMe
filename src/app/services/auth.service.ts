import { AppUser } from '../models/app-user';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of, empty } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private userService: UserService, private router: Router) { 
    this.user$ = afAuth.authState;
  }

  login(email: string, password: string) {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    
    this.afAuth.signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // ...
    });
  }

  logout() { 
    this.afAuth.signOut();
    this.router.navigateByUrl('/');
  }

  get appUser$() : Observable<AppUser> {
    return this.user$.pipe(switchMap(user => {
        if (user) return this.userService.get(user.uid);

        return of(null);
      }));    
  }

}
