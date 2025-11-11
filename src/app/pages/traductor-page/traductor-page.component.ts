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
  private socket!: WebSocket;

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

      numberMap: { [key: string]: string } = {
    '1': '⠁', '2': '⠃', '3': '⠉', '4': '⠙', '5': '⠑',
    '6': '⠋', '7': '⠛', '8': '⠓', '9': '⠊', '0': '⠚'
  };

  ngOnInit() {
  // Dirección IP y puerto del ESP32
  const esp32Host = 'ws://192.168.1.109:80';

  this.socket = new WebSocket(esp32Host);

  this.socket.onopen = () => {
    console.log('✅ Conectado al ESP32 WebSocket');
  };

  this.socket.onmessage = (event) => {
    console.log('📩 Mensaje del ESP32:', event.data);
  };

  this.socket.onclose = () => {
    console.warn('❌ Conexión WebSocket cerrada');
  };

  this.socket.onerror = (err) => {
    console.error('⚠️ Error WebSocket:', err);
  };
}

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
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
  // Enviar el texto original (no la traducción Braille visual)
  this.socket.send(this.text);
  console.log('📤 Enviado al ESP32:', this.text);
} else {
  console.warn('⚠️ WebSocket no conectado, no se envió nada');
}
    this.text = '';
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
  if (this.socket && this.socket.readyState === WebSocket.OPEN) {
  // Enviar el texto original (no la traducción Braille visual)
  this.socket.send(this.text);
  console.log('📤 Enviado al ESP32:', this.text);
} else {
  console.warn('⚠️ WebSocket no conectado, no se envió nada');
}
}



}
