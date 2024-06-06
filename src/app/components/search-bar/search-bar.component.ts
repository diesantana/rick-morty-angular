import { Component } from '@angular/core';
import { RickMortyService } from '../../services/rick-morty.service';
import { IApiResponse } from '../../models/api-response.interface';
import { ICharacter } from '../../models/character.interface';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  lists: string[] = ['Characters', 'Episodes', 'Locations'];
  genders: string[] = ['female', 'male', 'genderless', 'unknown'];
  status: string[] = ['alive', 'dead', 'unknown'];

  selectedList: string = this.lists[0]; // Valor padrão
  selectedGender: string = '';
  selectedStatus: string = '';
  userInput: string = '';

  constructor(private rickMortyService: RickMortyService){}

  onSearch(): void { // onsearch
    if(this.selectedList === this.lists[0]) {
      const params = {
        name: this.userInput,
        gender: this.selectedGender,
        status: this.selectedStatus
      };

      this.rickMortyService.getAllCharacters(params).subscribe((data: IApiResponse<ICharacter>) => {
        console.log("Search response:");
        console.log(data.results);
      });
    }
  } // onsearch edn

}
