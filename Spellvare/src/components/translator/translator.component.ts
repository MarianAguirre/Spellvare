import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslationComponent } from "./components/translation/translation.component";

@Component({
  selector: 'app-translator',
  standalone: true,
  imports: [TranslationComponent],
  templateUrl: './translator.component.html',
  styleUrl: './translator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TranslatorComponent {

}
