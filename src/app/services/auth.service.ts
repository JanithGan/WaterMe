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

  signUp(email: string, password: string, deviceId: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  }

  login(email: string, password: string) {
    // let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    // localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.signInWithEmailAndPassword(email, password).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      if (errorCode == 'auth/wrong-password') {
        alert('The password is wrong.');
      } else if (errorCode == 'auth/user-not-found') {
        alert('The account does not exist');
      } else {
        alert(errorMessage);
      }
      return error;
    });
  }

  logout() {
    this.afAuth.signOut();
    this.router.navigateByUrl('/');
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(switchMap(user => {
      if (user) return this.userService.get(user.uid);

      return of(null);
    }));
  }

}
