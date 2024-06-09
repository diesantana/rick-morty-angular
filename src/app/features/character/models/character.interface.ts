export interface ICharacter {
  id: number;
  name: string;
  status: 'alive' | 'dead' | 'unknown';
  species: string;
  gender: 'female' | 'male' | 'genderless' | 'unknown';
  image: string;
}
