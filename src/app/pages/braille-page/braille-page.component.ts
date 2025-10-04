import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-braille-page',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './braille-page.component.html',
  styleUrl: './braille-page.component.css'
})
export class BraillePageComponent {

}
