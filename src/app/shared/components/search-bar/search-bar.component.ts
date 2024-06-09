import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IApiResponse } from '../../models/api-response.interface';
import { ISearchParams } from '../../models/search-params.interface';
import { IEpisode } from '../../models/episode.interface';
import { RickMortyService } from '../../../core/services/rick-morty.service';
import { ICharacter } from '../../models/character.interface';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent implements OnInit {
  @Output() searchSuccess: EventEmitter<IApiResponse<any>> = new EventEmitter<IApiResponse<any>>();
  @Output() searchParams: EventEmitter<ISearchParams> = new EventEmitter<ISearchParams>();
  @Output() responseEpisode: EventEmitter<IApiResponse<IEpisode>> = new EventEmitter<IApiResponse<IEpisode>>();

  genders: string[] = ['female', 'male', 'genderless', 'unknown'];
  status: string[] = ['alive', 'dead', 'unknown'];
  textPlaceholder: string = 'Filter by name...';

  @Input() currentList!: string;
  selectedGender: string = '';
  selectedStatus: string = '';
  userInput: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private rickMortyService: RickMortyService){}

  ngOnInit(): void {
    if(this.currentList === 'Characters') {
      this.emitSearchParams();
    }
    this.onSearch(); // Realiza a busca inicial ao carregar
    this.setPlaceholder();
  }

  onSearch(): void {
    if(this.currentList === 'Characters') {
      this.findCharacters();
    } else if(this.currentList === 'Episodes') {
      this.getEpisodes();
    }
  }

  // Método para ser chamado em eventos de input ou change
  onFilterChange(): void {
    this.setPlaceholder();
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

  setPlaceholder(): void{
    if(this.currentList === 'Characters') {
      this.textPlaceholder= 'Filter by name...';
    } else {
      this.textPlaceholder= 'Filter by id...';
    }
  }

  findCharacters(): void {
    this.isLoading = true;
    const params = {name: this.userInput, gender: this.selectedGender, status: this.selectedStatus};
    this.searchParams.emit(params); // Emite os parâmetros de busca

    this.rickMortyService.getAllCharacters(params).subscribe({
      next: (data: IApiResponse<ICharacter>) => {
        this.searchSuccess.emit(data);  // Emitindo o evento com os resultados da pesquisa
        this.isLoading = false;
        this.errorMessage = "";
      },
      error: (error: string) => {
        this.errorMessage = error;
        // Emitir o evento com uma empty list em caso de erro
        this.searchSuccess.emit({ results: []} as unknown  as IApiResponse<ICharacter>);
        this.isLoading = false;
      }
    });

  }

  getEpisodes(): void {
    this.isLoading = true;
    this.rickMortyService.getAllEpisodes(this.userInput).subscribe({
      next: (data: IApiResponse<IEpisode>) => {
        this.responseEpisode.emit(data);  // Emitindo o evento com os resultados da pesquisa
        this.isLoading = false;
        this.errorMessage = "";
      },
      error: (error: string) => {
        this.errorMessage = error;
        // Emitir o evento com uma empty list em caso de erro
        this.responseEpisode.emit({ results: []} as unknown  as IApiResponse<IEpisode>);
        this.isLoading = false;
      }
    });

  }

}
