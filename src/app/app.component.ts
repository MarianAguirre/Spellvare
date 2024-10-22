import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslatorComponent } from '../components/translator/translator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Spellvare';
}
