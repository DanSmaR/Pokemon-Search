import { 
  Box, 
  Card, 
  CardContent, 
  CardMedia, 
  Divider, 
  List, 
  ListItem, 
  ListItemText, 
  Typography,
  Chip,
  Grid
} from '@mui/material';

export interface PokemonData {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
    back_default?: string | null;
    other: {
      'official-artwork': {
        front_default: string;
        front_shiny?: string;
      };
    };
  };
  abilities: Array<{
    is_hidden: boolean;
    slot: number;
    ability: {
      name: string;
      url: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  species?: {
    name: string;
    url: string;
  };
}

const PokemonDetails = ({ pokemon }: { pokemon: PokemonData }) => {
  return (
    <Card sx={{ mt: 4 }}>
      <CardMedia
        component="img"
        height="250"
        image={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default || undefined}
        alt={pokemon.name}
        sx={{ objectFit: 'contain', backgroundColor: '#f5f5f5' }}
      />
      <CardContent>
        <Typography variant="h5" gutterBottom textTransform="capitalize">
          {pokemon.name} #{pokemon.id}
        </Typography>
        
        <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
          Abilities
        </Typography>
        <List dense>
          {pokemon.abilities.map((ability, index) => (
            <ListItem key={index}>
              <ListItemText 
                primary={
                  <Box display="flex" alignItems="center">
                    <Typography textTransform="capitalize">{ability.ability.name.replace('-', ' ')}</Typography>
                    {ability.is_hidden && (
                      <Chip size="small" label="Hidden" color="secondary" sx={{ ml: 1 }} />
                    )}
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="h6" color="primary">
          Stats
        </Typography>
        <Grid container spacing={2}>
          {pokemon.stats.map((stat, index) => (
            <Grid key={index} size={{ xs: 6, sm: 4 }}>
              <Box sx={{ textAlign: 'center', p: 1, border: '1px solid #eee', borderRadius: 1 }}>
                <Typography variant="body2" color="textSecondary" textTransform="uppercase">
                  {stat.stat.name.replace('-', ' ')}
                </Typography>
                <Typography variant="h6">
                  {stat.base_stat}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PokemonDetails;