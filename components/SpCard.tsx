import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
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
}

export default function SpCard({ title, image, url = '/' }: Props) {
  const theme = useTheme()
  return (
    <span style={{ cursor: 'pointer' }}>
      <Link href={url}>
        <Card sx={{ display: 'flex' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component='div' variant='h5'>
                {title}
              </Typography>
              <Typography variant='subtitle1' color='text.secondary' component='div'>
                Actualizado {moment(Date.now()).format('DD MMM YYYY')}
              </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
              <IconButton aria-label='play/pause'>
                <VisibilityIcon />
              </IconButton>
            </Box>
          </Box>

          {image && (
            <CardMedia
              component='img'
              style={{
                width: 'auto',
                maxHeight: '200px',
                paddingBottom: '20px',
                opacity: '.2',
              }}
              image={image}
              alt='Live from space album cover'
            />
          )}
        </Card>
      </Link>
    </span>
  )
}
