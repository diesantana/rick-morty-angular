import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ICharacter } from '../models/character.interface';
import { ISearchParams } from '../../../shared/models/search-params.interface';
import { RickMortyService } from '../../../core/services/rick-morty.service';
import { IApiResponse } from '../../../shared/models/api-response.interface';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css'
})
export class CharacterListComponent implements OnInit {
  currentList: string = 'Characters';
  characters: ICharacter[] = [];
  page: number = 1;
  searchParams: ISearchParams = {};
  hasMorePages: boolean = true;

  constructor(private rickMortyService: RickMortyService) {
  }

  ngOnInit(): void { }

  // Atualiza a lista com os resultados de busca
  handleSearchSuccess(data: IApiResponse<ICharacter>): void {
    this.characters = data.results;
    // Reseta a página ao fazer uma nova busca
    this.page = 1;
    // Verifica se data.info existe antes de acessar next
    this.hasMorePages = data.info && data.info.next !== null;
  }

  // Atualiza os parâmetros de busca e faz a requisição inicial
  handleSearchParams(params: ISearchParams): void {
    this.searchParams = params;
    this.page = 1; // Reseta a página ao fazer uma nova busca
    this.loadCharacters();
  }

  // Carrega personagens com base nos parâmetros de busca e na página atual
  loadCharacters(): void {
    if (!this.hasMorePages) {
      return; // Se não há mais páginas, não faz a requisição
    }

    const params = { ...this.searchParams, page: this.page };

    this.rickMortyService.getAllCharacters(params).subscribe({
      next: (data: IApiResponse<ICharacter>) => {
        if (this.page === 1) {
          this.characters = data.results;
        } else {
          this.characters = [...this.characters, ...data.results];
        }
        this.hasMorePages = data.info && data.info.next !== null;
      }
    });
  }

  // Incrementa a página e carrega mais personagens ao rolar a lista
  onScroll(): void {
    this.page++;
    this.loadCharacters();
  }

}
