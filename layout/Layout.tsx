import { Grid } from '@mui/material'
import React from 'react'
import Sidebar from '../components/Sidebar'

interface Props {
  children: JSX.Element | JSX.Element[]
}

const Layout = ({ children }: Props) => {
  return (
    <Sidebar>
      <Grid item xs={8} md={10} style={{ height: 100 }}>
        {children}
      </Grid>
    </Sidebar>
  )
}

export default Layout
