import { Component } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive} from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SignUpRequest } from '../../model/IUser';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [NgIf, MatButton, MatIconButton, MatIcon, RouterLink, RouterLinkActive,
    ReactiveFormsModule, FormsModule, NgClass
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
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
  constructor(private authService: AuthService){}
  allFieldsFilled(user: SignUpRequest): boolean {
    return Object.values(user).every(field => field !== null && field !== '');
  }

  signUp() {
    this.formSubmit = true;

    if (this.allFieldsFilled(this.user)) {
      this.authService.signUp(this.user).subscribe(data => {
        this.message = data.message;
        console.log(this.message);
      },
      error => {
        console.log(error.message);
        this.error = error.message.charAt(0).toUpperCase() + error.message.slice(1);
      });
    } else {
      this.error = 'Please fill in all fields';
      console.log(this.error);
    }
  }
}