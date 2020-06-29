import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  path = 1;

  constructor(private auth: AuthService, private router: Router, private userService: UserService) {
    auth.user$.subscribe(user => {
      if (user) {
        console.log(user);
        router.navigateByUrl('form/' + user.uid);
      }
      else {
        router.navigateByUrl('login');
      }
    })

  }

}