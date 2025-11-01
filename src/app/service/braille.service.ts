import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrailleServiceService {
  private brailleMap: { [key: string]: string } = {
      'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑',
      'f': '⠋', 'g': '⠛', 'h': '⠓', 'i': '⠊', 'j': '⠚',
      'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕',
      'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞',
      'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽',
      'z': '⠵', "":"   ", " ":"   "
    };

  private numberMap: { [key: string]: string } = {
      '1': '⠁', '2': '⠃', '3': '⠉', '4': '⠙', '5': '⠑',
      '6': '⠋', '7': '⠛', '8': '⠓', '9': '⠊', '0': '⠚'
    };

  convertText(text: string) {
    const textLower = text.toLowerCase();
    let translation = '';
    let isNumberSequence = false;

    for (let i = 0; i < textLower.length; i++) {
      const char = textLower[i];

      if (/[0-9]/.test(char)) {
        if (!isNumberSequence) {
          translation += '⠼';
          isNumberSequence = true;
        }
        translation += this.numberMap[char];
      } else {
        isNumberSequence = false;
        translation += this.brailleMap[char] || char;
      }
    }
    return translation;
  }
}
