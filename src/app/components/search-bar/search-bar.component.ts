import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RickMortyService } from '../../services/rick-morty.service';
import { IApiResponse } from '../../models/api-response.interface';
import { ICharacter } from '../../models/character.interface';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent implements OnInit {
  //Define uma propriedade de saída que emitirá eventos para o componente pai.
  @Output() searchSuccess: EventEmitter<IApiResponse<ICharacter>> = new EventEmitter<IApiResponse<ICharacter>>();
  @Output() searchParams: EventEmitter<any> = new EventEmitter<any>();

  lists: string[] = ['Characters', 'Episodes', 'Locations'];
  genders: string[] = ['female', 'male', 'genderless', 'unknown'];
  status: string[] = ['alive', 'dead', 'unknown'];

  selectedList: string = this.lists[0]; // Valor padrão
  selectedGender: string = '';
  selectedStatus: string = '';
  userInput: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private rickMortyService: RickMortyService){}

  ngOnInit(): void {
    this.emitSearchParams();
    this.onSearch(); // Realiza a busca inicial ao carregar
  }

  onSearch(): void {
    if(this.selectedList === 'Characters') {
      this.isLoading = true; // ativa o spinner

      const params = {name: this.userInput, gender: this.selectedGender, status: this.selectedStatus};

      this.searchParams.emit(params); // Emite os parâmetros de busca

      this.rickMortyService.getAllCharacters(params).subscribe(
        (data: IApiResponse<ICharacter>) => {
          this.searchSuccess.emit(data);  // Emitindo o evento com os resultados da pesquisa
          this.isLoading = false;  // desativa o spinner
          this.errorMessage = ""; // limpa os erros em caso de sucessos
        },
        (error: string) => {
          this.errorMessage = error;
          // Emitir o evento com uma empty list em caso de erro
          this.searchSuccess.emit({ results: []} as unknown  as IApiResponse<ICharacter>);
          this.isLoading = false;  // desativa o spinner
        }
      );
    }
  }

  // Método para ser chamado em eventos de input ou change
  onFilterChange(): void {
    this.onSearch();
  }

  emitSearchParams(): void {
    const params = {
      name: this.userInput,
      gender: this.selectedGender,
      status: this.selectedStatus
    };
    this.searchParams.emit(params);
  }

}
