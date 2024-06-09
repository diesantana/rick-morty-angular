import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ICharacter } from '../models/character.interface';
import { ISearchParams } from '../../../shared/models/search-params.interface';
import { RickMortyService } from '../../../core/services/rick-morty.service';
import { IApiResponse } from '../../../shared/models/api-response.interface';

/**
 * Componente de lista de personagens da aplicação.
 * Exibe uma lista de personagens, com opções de busca e paginação.
 */

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

  /**
 * Atualiza a lista com os resultados de busca.
 *
 * @param data Dados da resposta da API, contendo a lista de personagens.
 */
  handleSearchSuccess(data: IApiResponse<ICharacter>): void {
    this.characters = data.results;
    this.page = 1;
    // Verifica se há mais páginas disponíveis
    this.hasMorePages = data.info && data.info.next !== null;
  }

  /**
   * Atualiza os parâmetros de busca e faz a requisição inicial.
   *
   * @param params Novos parâmetros de busca.
   */
  handleSearchParams(params: ISearchParams): void {
    this.searchParams = params;
    this.page = 1;
    this.loadCharacters();
  }

  /**
 * Carrega os personagens com base nos parâmetros de busca e página atual.
 */
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

  /**
 * Carrega mais personagens ao rolar a lista.
 */
  onScroll(): void {
    this.page++;
    this.loadCharacters();
  }

}
