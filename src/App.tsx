import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import MaterialUIForm from './components/Form';

export default function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Pokemon Search Form
        </Typography>
        <MaterialUIForm />
      </Box>
    </Container>
  );
}
