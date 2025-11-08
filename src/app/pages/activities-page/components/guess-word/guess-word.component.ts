import { Component, inject } from '@angular/core';
import { BrailleServiceService } from '../../../../service/braille.service';
import { ActividadService } from '../../service/actividad.service';
import { ImagesService } from '../../service/images.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonHomeComponent } from '../../../../components/button-home/button-home.component';
import { KeyboardBrailleComponent } from '../../../../components/keyboard-braille/keyboard-braille.component';

@Component({
  selector: 'app-guess-word',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonHomeComponent, KeyboardBrailleComponent],
  templateUrl: './guess-word.component.html',
  styleUrl: './guess-word.component.css'
})
export class GuessWordComponent {
  public actividad = this.actividadService.getActividad();
  private imagesService = inject(ImagesService);
  private brailleService = inject(BrailleServiceService)

  private currentWord: string = 'flor';
  public imageUrl: string | null = null;
  public braille: string = '';
  public tagsImage: string[] = [];
  public translation: string = '';
  public brailleTranslationText: string = '';
  public timeLeft: number = 0;
  public score: number = 0;
  private timer: any = null;


  constructor(private actividadService: ActividadService) {}

  ngOnInit() {
    this.loadRandomImage(this.currentWord);
    this.startTimer();
  }

  startTimer() {
  clearInterval(this.timer);
  this.timeLeft = 45;
  this.timer = setInterval(() => {
    this.timeLeft--;
    if (this.timeLeft <= 0) {
      clearInterval(this.timer);
      // alert('Tiempo agotado');
      this.nextWord();
      this.resetTimer();
    }
  }, 1000);
}

resetTimer() {
  clearInterval(this.timer);
  this.startTimer();
}

pauseTimer(){
  clearInterval(this.timer);
}

resumeTimer() {
  clearInterval(this.timer);
  this.timer = setInterval(() => {
    this.timeLeft--;
    if (this.timeLeft <= 0) {
      clearInterval(this.timer);
      this.nextWord();
      this.resetTimer();
    }
  }, 1000);
}


  loadRandomImage(word: string) {
    this.imagesService.getRandomImage(word).subscribe({
      next: (data: any) => {
        if (data && data.hits && data.hits.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.hits.length);
          const img = data.hits[randomIndex];
          this.imageUrl = img.previewURL; // 🔹 URL principal de la imagen
          const description = img.tags || word; // 🔹 Usa tags como descripción simple
          console.log('Imagen:', img);
          console.log('Descripción:', description);
          this.tagsImage = description.split(',')
          this.braille = this.brailleService.convertText(this.getRandomText());

        } else {
          console.warn('No se encontraron imágenes para:', word);
          this.imageUrl = null;
        }
      },
      error: (err) => console.error('Error cargando imagen:', err),
    });
  }

  nextWord() {
    const words = ['manzana', 'perro', 'flor', 'árbol', 'auto', 'silla', 'libro', 'gato', 'taza', 'raton'];
    // const words = ['pikachu'];
    this.currentWord = words[Math.floor(Math.random() * words.length)];
    this.loadRandomImage(this.currentWord);
  }

  getRandomText(){
    let arrayPalabras = this.tagsImage.slice(0,5)
    console.log(arrayPalabras)
    let palabra = arrayPalabras[Math.floor(Math.random() * arrayPalabras.length)]
    console.log(palabra)
    return palabra
  }


  brailleTranslation(value: string){
    this.brailleTranslationText = value
  }

    clear(): void {
    this.translation = '';
    this.brailleTranslationText='';
  }

  confirm(): void {
    this.pauseTimer();
  if (this.braille.trim() === this.brailleTranslationText) {
    window.alert('Correcto');
    this.score++;
    this.nextWord();
    this.translation = '';
    this.brailleTranslationText = '';
    this.resetTimer();
  } else {
    window.alert('Incorrecto');
    this.resumeTimer();
  }
}

}
