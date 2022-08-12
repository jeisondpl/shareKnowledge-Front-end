import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import VisibilityIcon from '@mui/icons-material/Visibility'
import moment from 'moment'

interface Props {
  title: string
  image?: string
  url?: string
  descripcion?: string
}

export default function SpCard({ title, image, url = '/', descripcion }: Props) {
  return (
    <span style={{ cursor: 'pointer' }}>
      <Link href={url}>
        <Card sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Box>
                <Typography component='div' variant='h4'>
                  {title}
                </Typography>
                <Typography variant='subtitle1' color='text.secondary' component='div'>
                  {descripcion ? descripcion : `Actualizado ${moment(Date.now()).format('DD MMM YYYY')}`}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', ml: 10, justifyContent: 'end', alignContent: 'end', alignItems: 'end' }}>
                {image && (
                  <CardMedia
                    component='img'
                    style={{
                      width: 'auto',
                      maxHeight: '200px',
                      paddingBottom: '20px',
                      opacity: '.2',
                      marginTop: '20px',
                    }}
                    image={image}
                    alt='Live from space album cover'
                  />
                )}
              </Box>
            </Box>

            <Box sx={{ display: 'flex' }}>
              <IconButton aria-label='play/pause'>
                <VisibilityIcon color='success' />
              </IconButton>
            </Box>
          </Box>
        </Card>
      </Link>
    </span>
  )
}
