import { Component, inject } from '@angular/core';
import { ActividadService } from '../../service/actividad.service';
import { ButtonHomeComponent } from '../../../../components/button-home/button-home.component';
import { ImagesService } from '../../service/images.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activiti-page',
  standalone: true,
  imports: [ButtonHomeComponent, CommonModule],
  templateUrl: './activiti-page.component.html',
  styleUrl: './activiti-page.component.css',
})
export class ActivitiPageComponent {
  actividad = this.actividadService.getActividad();
  private imagesService = inject(ImagesService);

  imageUrl: string | null = null;
  currentWord: string = 'flor';
  braille: string = '';
  tagsImage: string[] = [];

  constructor(private actividadService: ActividadService) {}

  ngOnInit() {
    this.loadRandomImage(this.currentWord);
  }

  loadRandomImage(word: string) {
    this.imagesService.getRandomImage(word).subscribe({
      next: (data: any) => {
        if (data && data.hits && data.hits.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.hits.length);
          const img = data.hits[randomIndex];
          this.imageUrl = img.webformatURL; // 🔹 URL principal de la imagen
          const description = img.tags || word; // 🔹 Usa tags como descripción simple
          console.log('Imagen:', img);
          console.log('Descripción:', description);
          this.tagsImage = description.split(',')
          console.log(this.tagsImage)
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
}
