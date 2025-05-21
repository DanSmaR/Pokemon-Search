import { useFormik } from 'formik';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import { getPokemonByName, getPokemonByType } from '../utils/http-request';
import { Box, FormControl, InputLabel, MenuItem, Select, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import PokemonDetails, { PokemonData } from './PokemonDetails';
import PokemonList from './PokemonList';

// Pokemon types from the API
const pokemonTypes = [
  'normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel',
  'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy'
];

const nameValidationSchema = yup.object({
  name: yup.string().required('Name is required'),
});

const typeValidationSchema = yup.object({
  type: yup.string().required('Type is required'),
});

const MaterialUIForm = () => {
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [pokemonList, setPokemonList] = useState<Array<{name: string, url: string}> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchMode, setSearchMode] = useState<'name' | 'type'>('name');

  const handleSearchModeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newMode: 'name' | 'type',
  ) => {
    if (newMode !== null) {
      setSearchMode(newMode);
      setPokemonData(null);
      setPokemonList(null);
      setError(null);
    }
  };

  const handleNameSubmit = async (name: string) => {
    try {
      setLoading(true);
      setError(null);
      setPokemonList(null);
      const response = await getPokemonByName(name);
      console.log('Pokemon data:', response);
      setPokemonData(response as PokemonData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('Pokemon not found. Please check the name and try again.');
      console.error('Error fetching Pokemon:', error);
    }
  };

  const handleTypeSubmit = async (type: string) => {
    try {
      setLoading(true);
      setError(null);
      setPokemonData(null);
      const pokemonList = await getPokemonByType(type);
      console.log('Pokemon list by type:', pokemonList);
      setPokemonList(pokemonList);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(`No Pokemon found for type: ${type}`);
      console.error('Error fetching Pokemon by type:', error);
    }
  };

  const nameFormik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: nameValidationSchema,
    onSubmit: (values) => {
      handleNameSubmit(values.name.toLowerCase());
    },
  });

  const typeFormik = useFormik({
    initialValues: {
      type: '',
    },
    validationSchema: typeValidationSchema,
    onSubmit: (values) => {
      handleTypeSubmit(values.type.toLowerCase());
    },
  });

  return (
    <div>
      <Box sx={{ mb: 2 }}>
        <ToggleButtonGroup
          value={searchMode}
          exclusive
          onChange={handleSearchModeChange}
          aria-label="search mode"
          fullWidth
        >
          <ToggleButton value="name" aria-label="search by name">
            Search by Name
          </ToggleButton>
          <ToggleButton value="type" aria-label="search by type">
            Search by Type
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      
      {searchMode === 'name' ? (
        <form onSubmit={nameFormik.handleSubmit} noValidate>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Pokemon Name"
            value={nameFormik.values.name || ''}
            onChange={nameFormik.handleChange}
            onBlur={nameFormik.handleBlur}
            error={nameFormik.touched.name && Boolean(nameFormik.errors.name)}
            helperText={nameFormik.touched.name ? nameFormik.errors.name : ''}
            placeholder='Enter Pokemon Name'
          />
          <Button
            color="primary" 
            variant="contained" 
            fullWidth 
            type="submit" 
            disabled={loading}
            sx={{ mt: 1 }}
          >
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </form>
      ) : (
        <form onSubmit={typeFormik.handleSubmit} noValidate>
          <FormControl fullWidth>
            <InputLabel id="pokemon-type-label">Pokemon Type</InputLabel>
            <Select
              labelId="pokemon-type-label"
              id="type"
              name="type"
              value={typeFormik.values.type}
              label="Pokemon Type"
              onChange={typeFormik.handleChange}
              error={typeFormik.touched.type && Boolean(typeFormik.errors.type)}
            >
              {pokemonTypes.map((type) => (
                <MenuItem key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</MenuItem>
              ))}
            </Select>
            {typeFormik.touched.type && typeFormik.errors.type && (
              <Typography variant="caption" color="error">{typeFormik.errors.type}</Typography>
            )}
          </FormControl>
          <Button
            color="primary" 
            variant="contained" 
            fullWidth 
            type="submit" 
            disabled={loading}
            sx={{ mt: 1 }}
          >
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </form>
      )}
      
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      
      {pokemonData && <PokemonDetails pokemon={pokemonData} />}
      {pokemonList && <PokemonList pokemonList={pokemonList} />}
    </div>
  );
};

export default MaterialUIForm;