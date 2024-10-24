import { ChangeDetectionStrategy, Component, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-braille-translation',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './braille-translation.component.html',
  styleUrls: ['./braille-translation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrailleTranslationComponent {

  brailleMap: { [key: string]: string } = {
    '⠁': 'a', '⠃': 'b', '⠉': 'c', '⠙': 'd', '⠑': 'e',
    '⠋': 'f', '⠛': 'g', '⠓': 'h', '⠊': 'i', '⠚': 'j',
    '⠅': 'k', '⠇': 'l', '⠍': 'm', '⠝': 'n', '⠕': 'o',
    '⠏': 'p', '⠟': 'q', '⠗': 'r', '⠎': 's', '⠞': 't',
    '⠥': 'u', '⠧': 'v', '⠺': 'w', '⠭': 'x', '⠽': 'y',
    '⠵': 'z', '⠿': ' ' // Espacio
  };
  text: string = '';
  translation: string = '';

  // Función para agregar el símbolo braille y traducirlo
  addBrailleChar(brailleChar: string): void {
    const translatedChar = this.brailleMap[brailleChar] || '';
    this.text += translatedChar;
    this.translation = this.text;
  }

  clear(){
    this.text=""
  }
}
