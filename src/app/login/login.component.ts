<<<<<<< HEAD
=======
import { AuthService } from '../services/auth.service';
>>>>>>> 94bee9de89e78cb70db708fb0ebea9ca414b9c62
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
<<<<<<< HEAD
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

=======
export class LoginComponent{

  constructor(private auth: AuthService) { }

  login(loginForm){
     this.auth.login(loginForm.email, loginForm.password);
  }
>>>>>>> 94bee9de89e78cb70db708fb0ebea9ca414b9c62
}
