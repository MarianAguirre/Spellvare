import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslationService } from './service/translation.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-traductor-page',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './traductor-page.component.html',
  styleUrl: './traductor-page.component.css'
})
export class TraductorPageComponent {
    private translationService = inject(TranslationService)

    text: string = '';
    translation: string = '';

    brailleMap: { [key: string]: string } = {
      'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑',
      'f': '⠋', 'g': '⠛', 'h': '⠓', 'i': '⠊', 'j': '⠚',
      'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕',
      'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞',
      'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽',
      'z': '⠵', "":"   ", " ":"   "
    };
    convertirText() {
      this.translation = '';
      const textLower = this.text.toLowerCase();
      for (let caracter of textLower) {
        this.translation += this.brailleMap[caracter] || caracter;
      }
      this.translationService.setTranslation(this.text, this.translation);
    console.log(this.text, this.translation)
    this.text = '';
    }


}
