import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import VisibilityIcon from '@mui/icons-material/Visibility'
import moment from 'moment'
import { Grid } from '@mui/material'
import SpTitle from './SpTitle'

interface Props {
  title: string
  image?: string
  url?: string
  descripcion?: string
}

export default function SpCard({ title, image, url = '/', descripcion }: Props) {
  return (
    <Box style={{ cursor: 'pointer' }}>
      <Link href={url}>
        <Card sx={{ p: 5, height: '300px' }}>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12} xl={12}>
              <SpTitle title={title} variant='h4' />
              <SpTitle title={descripcion ? descripcion : `Actualizado ${moment(Date.now()).format('DD MMM YYYY')}`} variant='subtitle1' color='text.secondary' />
            </Grid>
            <Grid item md={12} xs={12} xl={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <>
                {image && (
                  <CardMedia
                    component='img'
                    style={{
                      width: '100px',
                      height: '100px',
                      opacity: '.2',
                    }}
                    image={image}
                    alt='Live from space album cover'
                  />
                )}
              </>
            </Grid>
          </Grid>
        </Card>
      </Link>
    </Box>
  )
}
