import { Component, inject } from '@angular/core';
import { BrailleServiceService } from '../../../../service/braille.service';
import { ActividadService } from '../../service/actividad.service';
import { ImagesService } from '../../service/images.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonHomeComponent } from '../../../../components/button-home/button-home.component';
import { KeyboardBrailleComponent } from '../../../../components/keyboard-braille/keyboard-braille.component';

import 'driver.js/dist/driver.css';
import { Driver, driver } from 'driver.js';

@Component({
  selector: 'app-guess-word',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonHomeComponent,
    KeyboardBrailleComponent,
  ],
  templateUrl: './guess-word.component.html',
  styleUrl: './guess-word.component.css',
})
export class GuessWordComponent {
  public actividad = this.actividadService.getActividad();
  private imagesService = inject(ImagesService);
  private brailleService = inject(BrailleServiceService);

  private currentWord: string = 'flor';
  public imageUrl: string | null = null;
  public braille: string = '';
  public tagsImage: string[] = [];
  public translation: string = '';
  public brailleTranslationText: string = '';
  public timeLeft: number = 45;
  public score: number = 0;
  private timer: any = null;

  constructor(private actividadService: ActividadService) {}

  ngOnInit() {
    this.startProductTour();
    this.loadRandomImage(this.currentWord);

  }
  startProductTour(): void {
    this.pauseTimer();
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: '.root',
          popover: {
            title: 'Bienvenido al Tutorial!',
            description: 'Estas son algunas instrucciones y explicaciones del funcionamiento del juego, puedes elejir saltarlo cerrando este dialogo',
          },
        },

        {
          element: '#guess-container',
          popover: {
            title: 'El juego',
            description: 'Este juego consiste en adivinar la palabra  que describe la imagen y escribirla con el teclado en braille pero cuiado, no todo es lo que parece...',
          },
        },
        {
          element: '#game-info',
          popover: {
            title: 'Tiempo y puntos',
            description: 'Aqui puedes observar el tiempo restante que posees para adivinar la palabra, si es correcta se te sumaran puntos de progreso',
          },
        },
        {
          element: '#Pistas',
          popover: {
            title: 'Palabras',
            description: 'Estas palabras sirven como pista y a su vez entre las palabras se encuentra la respuesta correcta, puedes intentar adivinar con todas pero si no tienes el conocimiento en braille necesario el tiempo te alcanzara',
          },
        },
        {
          element: '#group',
          popover: {
            title: 'Zona de respuesta',
            description: 'Aqui podras ver lo que estas escribiendo tanto en braille como en español, cuando tengas tu respuesta puedes confirmar si es correcta con el el boton, de caso contrario con el boton de borrar puedes eliminar lo escrito completamente.',
          },
        },
        {
          element: '.root',
          popover: {
            title: 'Fin del tutorial',
            description: 'Consideramos que ya te hemos explicado lo necesario para entender el juego, diviertete practicando de esta forma braille!',
          },
        },
      ],
      onDestroyStarted: () => {
      console.log('Tutorial cerrado, iniciando temporizador...');
      this.startTimer();
      driverObj.destroy();
    },
    }
  );

    driverObj.drive();
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

  pauseTimer() {
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
          this.tagsImage = description.split(',');
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
    const words = [
      'manzana',
      'perro',
      'flor',
      'árbol',
      'auto',
      'silla',
      'libro',
      'gato',
      'taza',
      'raton',
    ];
    // const words = ['pikachu'];
    this.currentWord = words[Math.floor(Math.random() * words.length)];
    this.loadRandomImage(this.currentWord);
  }

  getRandomText() {
    let arrayPalabras = this.tagsImage.slice(0, 5);
    console.log(arrayPalabras);
    let palabra =
      arrayPalabras[Math.floor(Math.random() * arrayPalabras.length)];
    console.log(palabra);
    return palabra;
  }

  brailleTranslation(value: string) {
    this.brailleTranslationText = value;
  }

  clear(): void {
    this.translation = '';
    this.brailleTranslationText = '';
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
