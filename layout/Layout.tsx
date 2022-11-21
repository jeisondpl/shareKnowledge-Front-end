import { Grid } from '@mui/material'
import Sidebar from '../components/SpSidebar'
import { useRouter } from 'next/router'
import { SpLoading } from '../components'
import { useSelector } from 'react-redux'
import { RootState } from '../store/rootReducer'

interface Props {
  children: JSX.Element | JSX.Element[]
}

const Layout = ({ children }: Props) => {
  const router = useRouter()
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  !isAuthenticated && router.push('/login')

  if (!isAuthenticated) return <SpLoading loading={true} />

  return (
    <Sidebar>
      <Grid item xs={8} md={10} style={{ height: 100 }}>
        {children}
      </Grid>
    </Sidebar>
  )
}

export default Layout
