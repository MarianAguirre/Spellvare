import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslationComponent } from "./components/translation/translation.component";
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../translation.service';
import { BrailleTranslationComponent } from "./components/braille-translation/braille-translation.component";

@Component({
  selector: 'app-translator',
  standalone: true,
  imports: [TranslationComponent, FormsModule, BrailleTranslationComponent],
  templateUrl: './translator.component.html',
  styleUrl: './translator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TranslatorComponent {

  private translationService = inject(TranslationService)

  showTranslator: boolean = true;  // Controla qué vista mostrar

  toggleView(): void {
    this.showTranslator = !this.showTranslator;
  }
  text: string = '';
  translation: string = '';
  brailleMap: { [key: string]: string } = {
    'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑',
    'f': '⠋', 'g': '⠛', 'h': '⠓', 'i': '⠊', 'j': '⠚',
    'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕',
    'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞',
    'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽',
    'z': '⠵', ' ': ' '
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
