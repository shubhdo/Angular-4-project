import {
  Component,
  OnInit
} from '@angular/core';
import {
  AuthService
} from '../services/auth.service';
import {
  Router
} from '@angular/router';
import {
  FlashMessagesService
} from 'angular2-flash-messages';
//importing classes
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService) {}


  ngOnInit() {}
  //logout user form admin panel
  onLogoutClick() {
    this.authService.logout();
    this.flashMessage.show('See you soon bro!', {
      cssClass: 'alert-success'
    });
    this.router.navigate(['/login']);
    return false;
  }
}
