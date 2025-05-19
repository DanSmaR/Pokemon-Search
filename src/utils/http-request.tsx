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