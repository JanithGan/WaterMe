import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})

export class DataFormComponent {

  frequencies = ['None', 'Daily', 'Weekly'];
  subunits = ['Unit 1', 'Unit 2', 'Unit 3'];

  stats = {"Unit 1":{temp:25, humidity:0.2}, "Unit 2":{temp:26, humidity:0.3}, "Unit 3":{temp:27, humidity:0.4}};
  
  unitTemp = this.stats["Unit 1"].temp;
  unitHumidity = this.stats["Unit 1"].humidity;

  data;
  appUser = <AppUser>{};

  constructor(private dataService: DataService, private auth: AuthService) { 
    auth.appUser$.subscribe(appUser => this.appUser = appUser)
  } 

  logout(){
    this.auth.logout();
  }
  
  save(f){
    console.log(f);
    this.dataService.get('testUser').pipe().subscribe(p => {
      this.data = p;
      console.log(p);
    });
  }

  onUnitChanged2(unitNo){
    console.log(unitNo.value);
    this.unitTemp = this.stats[unitNo.value].temp;
    this.unitHumidity = this.stats[unitNo.value].humidity;
  }

}
