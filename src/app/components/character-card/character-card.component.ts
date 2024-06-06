import { Component, Input } from '@angular/core';
import { ICharacter } from '../../models/character.interface';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.css'
})
export class CharacterCardComponent {
  @Input() character!: ICharacter;
}
