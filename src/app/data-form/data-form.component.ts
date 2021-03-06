import { SubUnitSettings } from './../models/sub-unit';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { AppUser } from '../models/app-user';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})

export class DataFormComponent implements OnDestroy {

  frequencies = ['None', 'Daily', 'Weekly'];
  subunits = [];

  appUser = <AppUser>{};
  deviceId: string;

  mode: string = "auto";
  unitTemp: number;
  unitMoisture: number;
  deviceData: any;

  currentUnit: string;
  settingsUnit = <SubUnitSettings>{};
  dataUnit$: Subscription;

  constructor(private dataService: DataService, private auth: AuthService) {
    auth.appUser$.pipe(take(1)).subscribe(appUser => {
      this.appUser = appUser;
      if (appUser) {
        this.deviceId = appUser.deviceId;

        this.dataService.get(this.deviceId).pipe(take(1)).subscribe(data => {
          this.deviceData = data;
          this.mode = this.deviceData["mode"];
          for (var sub in this.deviceData.units) this.subunits.push(sub);
        });
      }
    })
  }

  ngOnDestroy() {
    this.dataUnit$.unsubscribe();
  }

  onUnitChanged(unitNo: string) {
    if (this.currentUnit)
      this.deviceData.units[this.currentUnit].settings = this.settingsUnit;
    this.currentUnit = unitNo;
    this.settingsUnit = this.deviceData.units[unitNo].settings;
  }

  onDataUnitChanged(unitNo: string) {
    if (this.dataUnit$)
      this.dataUnit$.unsubscribe();
    this.dataUnit$ = this.dataService.getSubUnitData(this.deviceId, unitNo).subscribe(dataUnit => {
      this.unitTemp = dataUnit['temperature'];
      this.unitMoisture = dataUnit['moisture'];
    });
  }

  logout() {
    this.auth.logout();
  }

  saveForm(f: any) {
    for (let unitNo of this.subunits) {
      this.dataService.saveSubUnit(this.deviceId, unitNo, this.deviceData.units[unitNo].settings);
    }
  }
}
