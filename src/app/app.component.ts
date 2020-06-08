import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'waterme';
  frequencies = ['None', 'Daily', 'Weekly'];
  subunits = ['Unit 1', 'Unit 2', 'Unit 3'];
  modes = ['Auto', 'Manual'];
}