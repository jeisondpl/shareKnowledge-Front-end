import { Grid } from '@mui/material'
import Layout from '../layout/Layout'
import SpCard from '../components/SpCard'
import { MENU } from '../components/SpSidebar'
import { SpTitle } from '../components'

const Index = () => {
  return (
    <Layout>
      <SpTitle title='Inicio' variant='h3' />
      <Grid container spacing={3} sx={{ paddingTop: '20px' }}>
        {MENU.map((item) => (
          <>
            {item.name !== 'Inicio' && (
              <Grid item md={3} xs={12} xl={3} key={item.id}>
                <SpCard title={item.name} image={item.image} url={item.url} />
              </Grid>
            )}
          </>
        ))}
      </Grid>
    </Layout>
  )
}

export default Index
