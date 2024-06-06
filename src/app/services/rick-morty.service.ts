import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { ICharacter } from '../models/character.interface';
import { IApiResponse } from '../models/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class RickMortyService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllCharacters(): Observable<IApiResponse<ICharacter>> {
    return this.http.get<IApiResponse<ICharacter>>(`${this.baseUrl}/character`);
  }

}
