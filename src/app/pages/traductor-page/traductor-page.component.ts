import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslationService } from './service/translation.service';
import { FormsModule } from '@angular/forms';
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
  }

  convertTextLive() {
    this.translation = this.brailleService.convertText(this.text)
    this.translationService.setTranslation(this.text, this.translation);
  }

}
