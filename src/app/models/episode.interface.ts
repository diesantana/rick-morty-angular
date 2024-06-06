export interface IEpisode {
  id: number;
  name: string;
  episode: string;
  air_date: string;
  characters: string[]; // Lista de URLs dos personagens
}
