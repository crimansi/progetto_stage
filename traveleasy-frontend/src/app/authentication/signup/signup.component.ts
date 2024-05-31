import { Component, OnDestroy } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SignUpRequest } from '../../model/IUser';
import { AuthService } from '../../service/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [NgIf, MatButton, MatIconButton, MatIcon, RouterLink, RouterLinkActive,
    FormsModule, NgClass
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnDestroy {
  hide: boolean=true;
  hideConfirm: boolean = true;
  formSubmit: boolean = false;
  showPasswordValidation: boolean = false;
  user: SignUpRequest = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  }
  message = '';
  error = '';
  private authSubscription: Subscription;
  constructor(private authService: AuthService){
    this.authSubscription = new Subscription;
  }

  allFieldsFilled(user: SignUpRequest): boolean {
    return Object.values(user).every(field => field !== null && field !== '');
  }

  signUp() {
    this.formSubmit = true;
    if (this.allFieldsFilled(this.user)) {
      this.authSubscription = this.authService.signUp(this.user).subscribe(data => {
          this.message = data.message;
          console.log(this.message);
        },
        error => {
          console.log(error.message);
          this.error = error.message.charAt(0).toUpperCase() + error.message.slice(1);
        });
    } else 
      this.error = 'Please fill in all fields';
  }

  ngOnDestroy(){
    if(this.authSubscription)
      this.authSubscription.unsubscribe();
  }
}