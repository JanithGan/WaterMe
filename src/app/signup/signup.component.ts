import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private auth: AuthService) { }

  signup(signUpF) {
    if (signUpF.password != signUpF.confPassword)
      alert("Passwords do not match")
    else {
      this.auth.signUp(signUpF.email, signUpF.password, signUpF.deviceId, signUpF.devicePassword);
    }
  }

}
