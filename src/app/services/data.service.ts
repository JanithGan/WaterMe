import { SubUnitSettings } from './../models/sub-unit';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private db: AngularFireDatabase) { }

  get(deviceId: string) {
    return this.db.object('/devices/' + deviceId).valueChanges();
  }

  getSubUnitData(deviceId: string, unitId: string) {
    return this.db.object('/devices/' + deviceId + '/units/' + unitId + '/data').valueChanges();
  }

  saveSubUnit(deviceId: string, unitId: string, unitData: SubUnitSettings) {
    this.db.object('/devices/' + deviceId + '/units/' + unitId + '/settings').update(unitData);
  }
}