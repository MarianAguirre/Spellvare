import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonHomeComponent } from "../../components/button-home/button-home.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-braille-page',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ButtonHomeComponent, CommonModule],
  templateUrl: './braille-page.component.html',
  styleUrl: './braille-page.component.css'
})
export class BraillePageComponent {

  charOrNumber: boolean = false

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

  // brailleChars = [
  //   ['⠁','⠃','⠉','⠙'],
  //   ['⠑','⠋','⠛','⠓'],
  //   ['⠊','⠚','⠅','⠇'],
  //   ['⠍','⠝','⠕','⠏'],
  //   ['⠟','⠗','⠎','⠞'],
  //   ['⠥','⠧','⠺','⠭'],
  //   ['⠽','⠵',' ']
  // ];

  brailleChars = [
    ['⠁','⠃','⠉','⠙', '⠑','⠋','⠛','⠓', '⠊','⠚','⠅','⠇', '⠍','⠝','⠕','⠏', '⠟','⠗','⠎','⠞', '⠥','⠧','⠺','⠭', '⠽','⠵','_']
  ];
  brailleNumbers = [
    ['⠁', '⠃', '⠉', '⠙', '⠑',
    '⠋', '⠛', '⠓', '⠊', '⠚','_']
  ];


  text = '';
  translation = '';

  addBrailleChar(brailleChar: string): void {
    if(!this.charOrNumber){
      const translated = this.brailleMap[brailleChar] ?? '';
      this.text += translated;
      this.translation = this.text;
    } else{
      const translated = this.brailleMapNumbers[brailleChar] ?? '';
      this.text += translated;
      this.translation = this.text;
    }
  }

  clear(): void {
    this.text = '';
    this.translation = '';
  }

  changeBraille(){
    this.charOrNumber = !this.charOrNumber
  }
}
