import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { AppUser } from '../models/app-user';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})

export class DataFormComponent {

  frequencies = ['None', 'Daily', 'Weekly'];
  subunits = ['Unit 1', 'Unit 2', 'Unit 3'];

  deviceData;
  deviceId: string;
  appUser = <AppUser>{};

  unitTemp: number;
  unitHumidity: number;

  constructor(private dataService: DataService, private auth: AuthService) {
    auth.appUser$.subscribe(appUser => {
      this.appUser = appUser;
      if (appUser) {
        this.deviceId = appUser.deviceId;

        this.dataService.get(this.deviceId).pipe(take(1)).subscribe(data => {
          this.deviceData = data;
          console.log(data);
        });
      }
    })
  }

  logout() {
    this.auth.logout();
  }

  saveForm(f) {
    console.log(f);
  }

  onUnitChanged2(unitNo) {
    this.unitTemp = this.deviceData[unitNo.value].temperature
    this.unitHumidity = this.deviceData[unitNo.value].humidity;
  }

}
