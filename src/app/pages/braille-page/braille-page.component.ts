import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonHomeComponent } from "../../components/button-home/button-home.component";
import { CommonModule } from '@angular/common';
import { KeyboardBrailleComponent } from "../../components/keyboard-braille/keyboard-braille.component";

@Component({
  selector: 'app-braille-page',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ButtonHomeComponent, CommonModule, KeyboardBrailleComponent],
  templateUrl: './braille-page.component.html',
  styleUrl: './braille-page.component.css'
})
export class BraillePageComponent {

  public translation = '';

  clear(): void {
    this.translation = '';
  }

}
