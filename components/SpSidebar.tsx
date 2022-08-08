import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { styled, Theme, CSSObject } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Link from 'next/link'
import { blue, grey } from '@mui/material/colors'
import HomeIcon from '@mui/icons-material/Home'
import AdbIcon from '@mui/icons-material/Adb'
import Button from '@mui/material/Button'
import { CardMedia, ListItemText, Menu, MenuItem, Tooltip } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import { deepPurple } from '@mui/material/colors'
import { useDispatch } from 'react-redux'
import { logout } from '../store/slices/auth'
import { useSelector } from 'react-redux'
import { RootState } from '../store/rootReducer'
import PersonIcon from '@mui/icons-material/Person'
import client from '../config/apollo'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import SchoolIcon from '@mui/icons-material/School'
import CategoryIcon from '@mui/icons-material/Category'
import color from '../Themes/Color'
import SpAlert from './SpAlert'
export interface PRops {
  children?: React.ReactNode
}

interface Menu {
  id: number
  name: string
  url: string
  icon: any
  image: string
}

export const MENU: Menu[] = [
  {
    id: 1,
    name: 'Inicio',
    url: '/',
    icon: <HomeIcon />,
    image: 'https://fasican.org/wp-content/uploads/2015/05/home-icon.png',
  },

  {
    id: 2,
    name: 'Usuarios',
    url: '/usuarios',
    icon: <PersonIcon />,
    image: 'https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png',
  },
  {
    id: 3,
    name: 'Materiales',
    url: '/materiales',
    icon: <MenuBookIcon />,
    image: 'https://cdn-icons-png.flaticon.com/512/46/46862.png',
  },
  {
    id: 4,
    name: 'Cursos',
    url: '/cursos',
    icon: <SchoolIcon />,
    image: 'https://cdn-icons-png.flaticon.com/512/5885/5885260.png',
  },
  {
    id: 5,
    name: 'Categoria materiales',
    url: '/materiales/categoria',
    icon: <CategoryIcon />,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNTT6j2b3btiGoSaXxbEJRXXegW6zGQ5VlMsESvKOweTij1LzYI2bRKwSTpsME4QkvLAI&usqp=CAU',
  },
]
const settings = ['Cerrar sesion']

const drawerWidth = 240

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

const SpSidebar = ({ children }: PRops) => {
  const router = useRouter()
  const token = useSelector((state: RootState) => state.auth.token)
  const [view, setView] = useState(true)

  // useEffect(() => {
  //   if (!token) {
  //     router.push('/login')
  //   } else {
  //     setView(false)
  //   }
  // }, [router])

  const user = useSelector((state: RootState) => state.auth.user)
  const dispatch = useDispatch()

  const [open, setOpen] = React.useState(false)
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = (e: any) => {
    setAnchorElUser(null)

    if (e.target.id === 'Cerrar sesion') {
      dispatch(logout())
      localStorage.removeItem('token')
      router.push('/login')
      client.clearStore()
    }
  }

  const handleUri = (url: string) => {
    router.push(url)
  }
  // if (view) return <SpAlert loading={view} />

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar
        position='fixed'
        open={open}
        sx={{
          background: '#1E3943',
        }}
      >
        <Toolbar>
          {open ? (
            <IconButton color='inherit' aria-label='open drawer' onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          ) : (
            <IconButton color='inherit' aria-label='open drawer' onClick={handleDrawerOpen} edge='start'>
              <MenuIcon />
            </IconButton>
          )}
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex', marginLeft: 20 }, mr: 1 }} />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {MENU.map((item: Menu) => (
              <Button key={item.id} onClick={handleCloseNavMenu} sx={{ my: 2, display: 'block', color: router.pathname === item.url ? 'white' : grey[500] }}>
                <Link href={item.url}>{item.name}</Link>
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', marginRight: '10px', justifyContent: 'center' }}>
                <span style={{ color: 'white', fontSize: '14px' }}>{user && user.nombre}</span>
                <span style={{ color: 'white', fontSize: '10px' }}>{user && user.rol}</span>
              </Box>
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: deepPurple[500] }}>{user && user.nombre[0]}</Avatar>
                </IconButton>
              </Tooltip>
            </Box>

            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography id={setting} textAlign='center'>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant='permanent'
        open={open}
        sx={{
          '& .MuiDrawer-paper': {
            background: '#7AC4B3',
          },
        }}
      >
        <DrawerHeader>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CardMedia
              component='img'
              sx={{ width: '50%', height: '50' }}
              image={'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Indra-Sistemas-Logo.svg/245px-Indra-Sistemas-Logo.svg.png'}
              alt='Live from space album cover'
            />
          </Box>
        </DrawerHeader>
        <Divider />

        <List>
          {MENU.map((item: Menu) => (
            <ListItem key={item.id} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={handleDrawerClose}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: router.pathname === item.url ? blue[600] : grey[800],
                  }}
                  onClick={() => handleUri(item.url)}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0, color: router.pathname === item.url ? blue[600] : grey[800] }} onClick={() => handleUri(item.url)} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box component='main' sx={{ flexGrow: 1, p: 3, background: color.backgroupd }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  )
}

export default SpSidebar
