import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-alphabet',
  standalone: true,
  imports: [],
  templateUrl: './alphabet.component.html',
  styleUrl: './alphabet.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlphabetComponent {

}
