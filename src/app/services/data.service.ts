import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private db: AngularFireDatabase) { }

  get(deviceId) {
    return this.db.object('/devices/' + deviceId).valueChanges();
  }
}
