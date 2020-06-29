import { DataService } from './data.service';
import { AppUser } from '../models/app-user';
import { UserService } from './user.service';
import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of, empty } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private userService: UserService,
    private dataService: DataService,
    private router: Router) {

    this.user$ = afAuth.authState;
  }

  signUp(email: string, password: string, deviceId: string, devicePassword: string) {
    this.dataService.get(deviceId).pipe(take(1)).subscribe(data => {
      if (data) {
        if (data["password"] == devicePassword) {
          this.createAccount(email, password, deviceId);
        }
        else
          alert("Device password does not match");
      }
      else
        alert("No device with this ID")
    });
  }

  createAccount(email: string, password: string, deviceId: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      })
      .then((value) => {
        console.log(value["user"])
        this.userService.save(value["user"], deviceId);;
      });
  }

  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      if (errorCode == 'auth/wrong-password') {
        alert('The password is wrong.');
      } else if (errorCode == 'auth/user-not-found') {
        alert('This account does not exist');
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
