import {
  Component,
  OnInit
} from '@angular/core';
import {
  AuthService
} from '../services/auth.service';
import {
  FlashMessagesService
} from 'angular2-flash-messages';
import {
  Router
} from '@angular/router';
//importing classes 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;

  constructor(private authService: AuthService, private router: Router, private flashMessage: FlashMessagesService) {}

  ngOnInit() {}
  onLoginSubmit() { //login user on submit 
    const user = {
      user: {
        email: this.username,
        password: this.password
      }
    }
    this.authService.authenticate(user).subscribe(data => { //API call to authenticate user
      if (data.success) {
        this.authService.storeUserData(data.token, data.user)
        this.flashMessage.show('Welcome to the club bro!', {
          cssClass: 'alert-success'
        });
        this.router.navigate(['dashboard']);
      } else {
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger'
        });
        this.router.navigate(['login']);
      }
    })
  }
}
