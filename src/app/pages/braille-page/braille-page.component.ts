import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonHomeComponent } from "../../components/button-home/button-home.component";

@Component({
  selector: 'app-braille-page',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ButtonHomeComponent],
  templateUrl: './braille-page.component.html',
  styleUrl: './braille-page.component.css'
})
export class BraillePageComponent {

}
