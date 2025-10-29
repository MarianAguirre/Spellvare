import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslationService } from './service/translation.service';
import { FormsModule } from '@angular/forms';
import { IaService } from '../../service/ia.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-traductor-page',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './traductor-page.component.html',
  styleUrl: './traductor-page.component.css'
})
export class TraductorPageComponent {
    private translationService = inject(TranslationService)
    private iaService = inject(IaService)


    text: string = '';
    translation: string = '';
    recomendacion: string = '';
    hayRecomendacion: boolean = false;
    isLoading: boolean = false;


    brailleMap: { [key: string]: string } = {
      'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑',
      'f': '⠋', 'g': '⠛', 'h': '⠓', 'i': '⠊', 'j': '⠚',
      'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕',
      'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞',
      'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽',
      'z': '⠵', "":"   ", " ":"   "
    };

      numberMap: { [key: string]: string } = {
    '1': '⠁', '2': '⠃', '3': '⠉', '4': '⠙', '5': '⠑',
    '6': '⠋', '7': '⠛', '8': '⠓', '9': '⠊', '0': '⠚'
  };

convertText() {
    this.translation = '';
    const textLower = this.text.toLowerCase();
    let isNumberSequence = false;

    for (let i = 0; i < textLower.length; i++) {
      const char = textLower[i];

      if (/[0-9]/.test(char)) {
        if (!isNumberSequence) {
          this.translation += '⠼';
          isNumberSequence = true;
        }
        this.translation += this.numberMap[char];
      } else {
        isNumberSequence = false;
        this.translation += this.brailleMap[char] || char;
      }
    }

    this.translationService.setTranslation(this.text, this.translation);
    console.log(this.text, this.translation);
    this.text = '';
    this.generateRecomendation();
  }


  convertTextLive() {
  const textLower = this.text.toLowerCase();
  let result = '';
  let isNumberSequence = false;

  for (let i = 0; i < textLower.length; i++) {
    const char = textLower[i];

    if (/[0-9]/.test(char)) {
      if (!isNumberSequence) {
        result += '⠼';
        isNumberSequence = true;
      }
      result += this.numberMap[char];
    } else {
      isNumberSequence = false;
      result += this.brailleMap[char] || char;
    }
  }

  this.translation = result;
  this.translationService.setTranslation(this.text, result);


}

 async generateRecomendation() {
  if (!this.translation.trim()) return;

  this.recomendacion = '';
  this.isLoading = true; // 🔹 Muestra el spinner

  try {
    const res: any = await this.iaService.query(this.text, this.translation);
    console.log(res);

    if (res) {
      this.recomendacion = res.choices[0].message.content;
    } else {
      this.recomendacion = "No se pudo generar la recomendación.";
    }
  } catch (error) {
    console.error("Error al generar la recomendación:", error);
    this.recomendacion = "Ocurrió un error al generar la recomendación.";
  } finally {
    this.isLoading = false; // 🔹 Oculta el spinner
  }
}

}
