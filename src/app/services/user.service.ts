import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { AppUser } from '../models/app-user';
import { Observable, from } from 'rxjs';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) {  }

  save(user: firebase.User, deviceId) {
    this.db.object('/users/' + user.uid).update({
      email:user.email,
      deviceId:deviceId
    });
  }

  get(uid: string): Observable<AppUser> {
    return this.db.object<AppUser>('/users/' + uid).valueChanges();
  }
}
