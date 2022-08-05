import { Grid } from '@mui/material'
import Layout from '../layout/Layout'
import { useSelector } from 'react-redux'
import { RootState } from '../store/rootReducer'
import SpCard from '../components/SpCard'
import { MENU } from '../components/Sidebar'

const Index = () => {
  const user = useSelector((state: RootState) => state.auth.user)

  return (
    <Layout>
      <Grid container spacing={3}>
        {user && user.rol !== 'VERIFICACION' ? (
          <>
            {MENU.map((item) => (
              <Grid key={item.id} item md={4} xs={6} rowSpacing={3}>
                <SpCard key={item.id} title={item.name} image={item.image} url={item.url} />
              </Grid>
            ))}
          </>
        ) : (
          <Grid item md={4} xs={6} rowSpacing={3}>
            <p>No tienes permisos para ver esta seccion solicite acceso al contenido de este espacio</p>
          </Grid>
        )}
      </Grid>
    </Layout>
  )
}

export default Index
