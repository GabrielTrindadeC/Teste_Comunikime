import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { axios } from '../../api/axios';
import { useAuthStore } from '../../store/auth';
import { useNavigate } from 'react-router-dom';
const theme = createTheme();

export function Register() {
  const navigate = useNavigate()
  const [checked, setChecked] = React.useState(false);
  const handleSignin = useAuthStore(state => state.Register)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      email: data.get('email') as string,
      password: data.get('password') as string,
      name: data.get('name') as string,
      address: data.get('address') as string,
      phone: data.get('phone') as string,
      role: checked ? 2 : 1
    }
    try {
      handleSignin(body)
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="Nome"
              type="name"
              id="name"
              autoComplete="name"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="address"
              label="Endereço"
              type="address"
              id="address"
              autoComplete="address"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="phone"
              label="Telefone"
              type="phone"
              id="phone"
              autoComplete="phone"
            />
            <p>Admin?</p>
            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Login"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}