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
  page: number = 1;
  searchParams: any = {};
  hasMorePages: boolean = true; // verifica se há mais páginas

  constructor(private rickMortyService: RickMortyService) {
  }

  ngOnInit(): void {
    // A busca inicial será feita pelo SearchBarComponent
  }

  // Atualiza a lista de personagens com os resultados da pesquisa
  handleSearchSuccess(data: IApiResponse<ICharacter>): void {
    this.characters = data.results;
    this.page = 1; // Reseta a página ao fazer uma nova busca
    this.hasMorePages = data.info.next !== null;
  }

  // Atualiza os parâmetros de busca e faz a requisição inicial
  handleSearchParams(params: any): void {
    this.searchParams = params;
    this.page = 1; // Reseta a página ao fazer uma nova busca
    this.loadCharacters();
  }

  // Carrega personagens com base nos parâmetros de busca e na página atual
  loadCharacters(): void {

    if(!this.hasMorePages) {
      return; // Se não há mais páginas, não faz a requisição
    }

    const params = {...this.searchParams, page: this.page};

    this.rickMortyService.getAllCharacters(params).subscribe((data: IApiResponse<ICharacter>) => {
      if(this.page === 1) {
        this.characters = data.results;
      } else {
        this.characters = [...this.characters, ...data.results];
      }
      this.hasMorePages = data.info.next !== null;
    });
  }

  // Incrementa a página e carrega mais personagens ao rolar a lista
  onScroll() {
    this.page++;
    console.log("scrolled!!");
    console.log(this.page);
    this.loadCharacters();
  }

}
