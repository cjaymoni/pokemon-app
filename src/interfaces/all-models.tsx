export interface IPokemonData {
  abilities: any[];
  base_experience: number;
  forms: any[];
  game_indices: any[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: any[];
  name: string;
  order: number;
  species: any;
  sprites: any;
  stats: any[];
  types: any[];
  weight: number;
}

export interface IInitialData {
  name: string;
  url: string;
}

export interface IAxiosResponse {
  data: any;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request: any;
}
