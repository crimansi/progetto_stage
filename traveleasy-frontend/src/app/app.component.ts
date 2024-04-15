import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { SearchComponent } from './search/search.component';
import { CdkScrollable } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolBarComponent, SearchComponent, CdkScrollable],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TravelEasy';
}
