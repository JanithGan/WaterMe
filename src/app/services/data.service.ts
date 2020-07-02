import { SubUnitSettings } from './../models/sub-unit';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private db: AngularFireDatabase) { }

  get(deviceId) {
    return this.db.object('/devices/' + deviceId).valueChanges();
  }

  saveSubUnit(deviceId: string, unitId: string, unitData: SubUnitSettings) {
    this.db.object('/devices/' + deviceId + '/units/' + unitId + '/settings').update(unitData);
  }
}