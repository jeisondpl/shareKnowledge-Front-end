import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from '@emotion/styled'
import { Card, CardActions, CardContent } from '@mui/material'

const BlueLink = styled.a`
  color: blue;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
`

interface Props {
  children: JSX.Element | JSX.Element[]
}

const LayoutLogin = ({ children }: Props) => {
  const router = useRouter()

  return (
    <Grid
      container
      component='main'
      sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center', margin: 0, background: '#23272E', height: '100vh' }}
    >
      <div style={{ color: 'white' }}>
        <Typography component='h1' variant='h4' sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center', marginBottom: 2 }}>
          {router.pathname === '/registrar' ? 'Registrar usuario' : 'Iniciar sesion'}
        </Typography>
      </div>
      <Card sx={{ width: 380, padding: 2 }}>
        <CardContent>{children}</CardContent>
        <CardActions>
          {router.pathname === '/registrar' ? (
            <Link href='/login'>
              <BlueLink>¿ya tienes cuenta? Inicia aqui!</BlueLink>
            </Link>
          ) : (
            <Link href='/registrar'>
              <BlueLink>¿No tienes una cuenta? Registrate</BlueLink>
            </Link>
          )}
        </CardActions>
      </Card>
    </Grid>
  )
}
export default LayoutLogin
