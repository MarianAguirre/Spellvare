import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { BrailleServiceService } from '../../service/braille.service';

@Component({
  selector: 'app-keyboard-braille',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './keyboard-braille.component.html',
  styleUrl: './keyboard-braille.component.css'
})
export class KeyboardBrailleComponent {
  private brailleService = inject(BrailleServiceService)

  @Input() translation = '';
  @Output() translationChange = new EventEmitter<string>();
  @Output() brailleTranslation = new  EventEmitter<string>();

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
    this.brailleTranslation.emit(this.brailleService.convertText(this.translation));
  }

  changeBraille(){
    this.charOrNumber = !this.charOrNumber
  }

  deleteLastChar(): void {
    if (this.text.length > 0) {
      this.text = this.text.slice(0, -1);
      this.translation = this.text;
      this.translationChange.emit(this.translation);
      this.brailleTranslation.emit(this.brailleService.convertText(this.translation));

    }
  }
}
