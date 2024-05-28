import { Component} from '@angular/core';
import { Router, RouterLink, RouterLinkActive} from '@angular/router';
import { NgIf } from '@angular/common';
import {MatMenu, MatMenuItem, MatMenuTrigger}from '@angular/material/menu';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-tool-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf, MatMenu, MatMenuItem, MatMenuTrigger],
  templateUrl: './tool-bar.component.html',
  styleUrl: './tool-bar.component.css'
})
export class ToolBarComponent {
  title="TravelEasy";
  isAuth: boolean = false;

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }
  get avatar(){
    return this.authService.avatar;
  }
  constructor(private authService: AuthService, private route: Router){
  }
  
  logout(): void{
    sessionStorage.clear();
    this.authService.isLoggedIn = false;
    this.authService.avatar = '';
  }
}

