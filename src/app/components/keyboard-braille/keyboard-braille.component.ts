import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-keyboard-braille',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './keyboard-braille.component.html',
  styleUrl: './keyboard-braille.component.css'
})
export class KeyboardBrailleComponent {
  @Input() translation = '';
  @Output() translationChange = new EventEmitter<string>();

  public charOrNumber: boolean = false
  public text = '';

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['translation'] && changes['translation'].currentValue === ''){
      this.text = '';
    }
  }

    brailleMap: Record<string, string> = {
    '⠁': 'a', '⠃': 'b', '⠉': 'c', '⠙': 'd', '⠑': 'e',
    '⠋': 'f', '⠛': 'g', '⠓': 'h', '⠊': 'i', '⠚': 'j',
    '⠅': 'k', '⠇': 'l', '⠍': 'm', '⠝': 'n', '⠕': 'o',
    '⠏': 'p', '⠟': 'q', '⠗': 'r', '⠎': 's', '⠞': 't',
    '⠥': 'u', '⠧': 'v', '⠺': 'w', '⠭': 'x', '⠽': 'y',
    '⠵': 'z', '_': ' '
  };

  brailleMapNumbers: Record<string, string> = {
    '⠁': '1', '⠃': '2', '⠉': '3', '⠙': '4', '⠑': '5',
    '⠋': '6', '⠛': '7', '⠓': '7', '⠊': '9', '⠚': '0', '_': ' '
  };

  brailleChars = [
    ['⠁','⠃','⠉','⠙', '⠑','⠋','⠛','⠓', '⠊','⠚','⠅','⠇', '⠍','⠝','⠕','⠏', '⠟','⠗','⠎','⠞', '⠥','⠧','⠺','⠭', '⠽','⠵','_']
  ];
  brailleNumbers = [
    ['⠁', '⠃', '⠉', '⠙', '⠑',
    '⠋', '⠛', '⠓', '⠊', '⠚','_']
  ];

  addBrailleChar(brailleChar: string): void {
    const map = this.charOrNumber ? this.brailleMapNumbers : this.brailleMap;
    const translated = map[brailleChar] ?? '';
    this.text += translated;
    this.translation = this.text;
    this.translationChange.emit(this.translation);
  }

  changeBraille(){
    this.charOrNumber = !this.charOrNumber
  }
}
