import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslationService } from '../../../translation.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-translation',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './translation.component.html',
  styleUrl: './translation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TranslationComponent {

  private translationService = inject(TranslationService)

  text$ = this.translationService.gettext();
  translation$ = this.translationService.gettranslation();

}
