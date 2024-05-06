import { Component} from '@angular/core';
import { RouterLink, RouterLinkActive} from '@angular/router';


@Component({
  selector: 'app-tool-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './tool-bar.component.html',
  styleUrl: './tool-bar.component.css'
})
export class ToolBarComponent {
  title="TravelEasy";

}
