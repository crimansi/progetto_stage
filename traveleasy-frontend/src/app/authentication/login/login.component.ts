import { Component, OnDestroy } from '@angular/core';
import { NgIf, NgClass} from '@angular/common';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive} from '@angular/router';
import { AuthResponse, LoginRequest } from '../../model/IUser';
import { AuthService } from '../../service/auth.service';
import { FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, MatIconButton, MatIcon, MatButton, RouterLink, RouterLinkActive, NgClass, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {
  hide: boolean = true;
  formSubmit: boolean = false;
  request: LoginRequest = {
    username: '',
    password: ''
  };
  authUser: AuthResponse = {
    token: '',
    id: -1,
    email: '',
    firstName: '',
    lastName: ''
  };
  error: string = '';
  private authSubscription: Subscription;

  constructor(private authService: AuthService, private route: Router){
    this.authSubscription = new Subscription;
  }

  login(): void{
    this.error = '';
    this.authSubscription = this.authService.login(this.request).subscribe(data => {
      this.authUser = data;
      sessionStorage.setItem('user', this.authUser.token);
      this.authService.isLoggedIn = true;
      this.route.navigate(['/search']);
    }, 
  error => {
    this.error = 'Username or password is incorrect'
  })
  }

  ngOnDestroy(){
    if(this.authSubscription)
      this.authSubscription.unsubscribe();
  }

}
