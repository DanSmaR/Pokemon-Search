import { useFormik } from 'formik';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import { getPokemonByName } from '../utils/http-request';
import { Typography } from '@mui/material';
import PokemonDetails, { PokemonData } from './PokemonDetails';

const validationSchema = yup.object({
  name: yup
    .string()
    .required('Name is required'),
});

const MaterialUIForm = () => {
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getPokemonByName(values);
      console.log('Pokemon data:', response);
      setPokemonData(response as PokemonData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('Pokemon not found. Please check the name and try again.');
      console.error('Error fetching Pokemon:', error);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values.name.toLowerCase());
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} noValidate>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name ? formik.errors.name : ''}
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
          {loading ? 'Searching...' : 'Submit'}
        </Button>
      </form>
      
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      
      {pokemonData && <PokemonDetails pokemon={pokemonData} />}
    </div>
  );
};

export default MaterialUIForm;