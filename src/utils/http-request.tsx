import { PokemonClient } from 'pokenode-ts';

export const getPokemonByName = async (name: string) => {
  const api = new PokemonClient();

  try {
    const data = await api.getPokemonByName(name);
    return data;
  } catch (error) {
    console.error('Error fetching Pokemon:', error);
    throw error;
  }
}

export const getPokemonByType = async (type: string) => {
  const api = new PokemonClient();

  try {
    const response = await api.getTypeByName(type);
    return response.pokemon.map(p => p.pokemon);
  } catch (error) {
    console.error('Error fetching Pokemon by type:', error);
    throw error;
  }
}