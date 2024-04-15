import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-tool-bar',
  standalone: true,
  imports: [MatToolbar,MatMenuTrigger, MatMenu, MatMenuItem, MatIcon, MatButton, 
    RouterLink, RouterLinkActive, RouterOutlet, NgIf],
  templateUrl: './tool-bar.component.html',
  styleUrl: './tool-bar.component.css'
})
export class ToolBarComponent implements OnInit {
  title="TravelEasy";
  isMobile: boolean = false;
  constructor(private breakpointObserver: BreakpointObserver){}
  ngOnInit(): void {
      this.breakpointObserver.observe([
        Breakpoints.Handset
      ]).subscribe(result => {this.isMobile = result.matches});
      
  }

}
