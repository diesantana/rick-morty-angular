import { Component, Input } from '@angular/core';
import { IEpisode } from '../../../shared/models/episode.interface';
import { RickMortyService } from '../../../core/services/rick-morty.service';
import { IApiResponse } from '../../../shared/models/api-response.interface';


@Component({
  selector: 'app-episode-list',
  templateUrl: './episode-list.component.html',
  styleUrl: './episode-list.component.css'
})
export class EpisodeListComponent {
  currentList: string = 'Episodes';
  episodes: IEpisode[] = [];
  page: number = 1;
  nextPage!: string | null;
  prevPage!: string | null;

  constructor(private rickMortyService: RickMortyService) {
  }

  ngOnInit(): void {
    this.loadEpisodes();
  }

 // Atualiza a lista com os resultados de busca
  handleReponseSuccess(data: any): void {
    if(data.info) {
      this.episodes = data.results;
      this.nextPage = data.info.next;
      this.prevPage = data.info.prev;
    } else {
      this.episodes = [];
      this.episodes.push(data);
    }
  }

  // Carrega personagens com base nos parâmetros de busca e na página atual
  loadEpisodes(): void {
    this.rickMortyService.getAllEpisodes("").subscribe((data: IApiResponse<IEpisode>) => {
      this.episodes = data.results;
      this.nextPage = data.info.next;
      this.prevPage = data.info.prev;
    });
  }

  onNextPage() {
    if(this.nextPage) {
      this.rickMortyService.getNextEpisodes(this.nextPage).subscribe((data: IApiResponse<IEpisode>) => {
        this.episodes = data.results;
        this.nextPage = data.info.next;
        this.prevPage = data.info.prev;
      })
    }
  }

  onPrevPage() {
    if(this.prevPage) {
      this.rickMortyService.getNextEpisodes(this.prevPage).subscribe((data: IApiResponse<IEpisode>) => {
        this.episodes = data.results;
        this.nextPage = data.info.next;
        this.prevPage = data.info.prev;
      })
    }
  }

}
