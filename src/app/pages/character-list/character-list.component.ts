import { Component, OnInit } from '@angular/core';
import { ICharacter } from '../../models/character.interface';
import { RickMortyService } from '../../services/rick-morty.service';
import { IApiResponse } from '../../models/api-response.interface';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css'
})
export class CharacterListComponent implements OnInit {
  characters: ICharacter[] = [];

  constructor(private rickMortyService: RickMortyService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.rickMortyService.getAllCharacters().subscribe((data: IApiResponse<ICharacter>) => {
      this.characters = data.results;
    });
  }


}
