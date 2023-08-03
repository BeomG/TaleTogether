import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useForm } from 'react-hook-form';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/userSlice';

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (event) => {
    setIsLoading(true);
    dispatch(login());
    // LoginAxios(event);

    setTimeout(() => {
      navigate('/intro');
    }, 2000); // 로그인 후 메인페이지로 이동
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                className="animate__animated animate__fadeIn animate__delay-0.3s"
                required
                fullWidth
                label="이메일"
                autoFocus
                {...register('email', {
                  required: true,
                })}
                error={!!errors.email}
                sx={{ backgroundColor: '#faedcd', borderRadius: '5px' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="animate__animated animate__fadeIn animate__delay-0.6s"
                required
                fullWidth
                label="비밀번호"
                type="password"
                {...register('password', {
                  required: true,
                })}
                error={!!errors.password}
                sx={{ backgroundColor: '#faedcd', borderRadius: '5px' }}
              />
            </Grid>

            <Grid
              className="animate__animated animate__fadeIn animate__delay-0.6s"
              item
              xs={12}
              sx={{ color: 'black' }}
            >
              <Link href="#" underline="none" variant="body2">
                <b>비밀번호 재설정</b>
              </Link>
            </Grid>
          </Grid>

          <Button
            className="animate__animated animate__fadeIn animate__delay-0.9s"
            required
            disabled={isLoading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 4, mb: 4, backgroundColor: '#faedcd', color: 'black' }}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Sign in'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
