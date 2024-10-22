import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private textSubject = new BehaviorSubject<string>('');
  private translationSubject = new BehaviorSubject<string>('');

  setTranslation(text: string, translation: string) {
    this.textSubject.next(text);
    this.translationSubject.next(translation);
  }

  gettext() {
    return this.textSubject.asObservable();
  }

  gettranslation() {
    return this.translationSubject.asObservable();
  }

}
