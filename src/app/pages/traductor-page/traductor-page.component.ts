import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslationService } from './service/translation.service';
import { FormsModule } from '@angular/forms';
import { IaService } from '../../service/ia.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrailleServiceService } from '../../service/braille.service';

@Component({
  selector: 'app-traductor-page',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    FormsModule,
    HttpClientModule,
    CommonModule,
  ],
  templateUrl: './traductor-page.component.html',
  styleUrl: './traductor-page.component.css',
})
export class TraductorPageComponent {
  private translationService = inject(TranslationService);
  private iaService = inject(IaService);
  private brailleService = inject(BrailleServiceService);


  public text: string = '';
  public translation: string = '';
  public recomendacion: string = '';
  public hayRecomendacion: boolean = false;
  public isLoading: boolean = false;

  convertText() {
    this.translation = this.brailleService.convertText(this.text);
    this.translationService.setTranslation(this.text, this.translation);
    this.text = '';
    this.generateRecomendation();
  }

  convertTextLive() {
    this.translation = this.brailleService.convertText(this.text)
    this.translationService.setTranslation(this.text, this.translation);
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
        this.recomendacion = 'No se pudo generar la recomendación.';
      }
    } catch (error) {
      console.error('Error al generar la recomendación:', error);
      this.recomendacion = 'Ocurrió un error al generar la recomendación.';
    } finally {
      this.isLoading = false; // 🔹 Oculta el spinner
    }
  }
}
