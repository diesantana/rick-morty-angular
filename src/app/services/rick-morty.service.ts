import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { ICharacter } from '../models/character.interface';
import { IApiResponse } from '../models/api-response.interface';
import { ISearchParams } from '../models/search-params.interface';

@Injectable({
  providedIn: 'root'
})
export class RickMortyService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllCharacters(params: ISearchParams): Observable<IApiResponse<ICharacter>> {
    // Inicializa HttpParams vazio
    let httpParams = new HttpParams();

    // Itera sobre cada chave no objeto de parâmetros
    for(const key in params) {
      // Se o valor do parâmetro não for vazio, adicionamos ao HttpParams
      if(params[key]) {
        httpParams = httpParams.set(key, params[key]);
      }
    }
    //Faz a requisição HTTP GET com os parâmetros (se houver)
    return this.http.get<IApiResponse<ICharacter>>(`${this.baseUrl}/character/`, {params: httpParams});
  }

}
