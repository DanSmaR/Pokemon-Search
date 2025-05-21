import { useState } from 'react';
import { 
  Box,
  CircularProgress, 
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { getPokemonByName } from '../utils/http-request';
import PokemonDetails, { PokemonData } from './PokemonDetails';

interface PokemonListProps {
  pokemonList: Array<{ name: string; url: string }>;
}

const PokemonList = ({ pokemonList }: PokemonListProps) => {
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePokemonSelect = async (name: string) => {
    try {
      setLoading(true);
      const pokemonData = await getPokemonByName(name);
      setSelectedPokemon(pokemonData as PokemonData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Pokemon details:', error);
      setLoading(false);
    }
  };

  const getPokemonIdFromUrl = (url: string): number => {
    const urlParts = url.split('/');
    return parseInt(urlParts[urlParts.length - 2], 10);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Pokemon Found: {pokemonList.length}
      </Typography>
      
      {selectedPokemon ? (
        <>
          <Typography 
            variant="subtitle2" 
            sx={{ mb: 2, cursor: 'pointer', color: 'primary.main' }}
            onClick={() => setSelectedPokemon(null)}
          >
            « Back to list
          </Typography>
          <PokemonDetails pokemon={selectedPokemon} />
        </>
      ) : (
        <TableContainer component={Paper}>
          <Table size="small" aria-label="pokemon list">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pokemonList.map((pokemon) => {
                const pokemonId = getPokemonIdFromUrl(pokemon.url);
                return (
                  <TableRow
                    key={pokemon.name}
                    hover
                    onClick={() => handlePokemonSelect(pokemon.name)}
                    sx={{ '&:hover': { cursor: 'pointer' } }}
                  >
                    <TableCell>{pokemonId}</TableCell>
                    <TableCell sx={{ textTransform: 'capitalize' }}>
                      {pokemon.name.replace('-', ' ')}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default PokemonList;