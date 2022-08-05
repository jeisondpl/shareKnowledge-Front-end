import React from 'react'
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles'
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
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ArticleIcon from '@mui/icons-material/Article'
import Link from 'next/link'
import { grey, blue } from '@mui/material/colors'
import HomeIcon from '@mui/icons-material/Home'
import { useRouter } from 'next/router'
import AdbIcon from '@mui/icons-material/Adb'
import Button from '@mui/material/Button'
import { CardMedia, ListItemText, Menu, MenuItem, Tooltip } from '@mui/material'
import Avatar from '@mui/material/Avatar'
// import { useQuery } from '@apollo/client'
// import { GET_FIND_BY_ID } from '../graphQL/Querys/Usuarios'
// import { InputRegister, UsuariosDataFindById } from '../types/Usuario'
import { deepPurple } from '@mui/material/colors'
import { useDispatch } from 'react-redux'
import { logout } from '../store/slices/auth'
import { useSelector } from 'react-redux'
import { RootState } from '../store/rootReducer'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

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
    id: 3,
    name: 'Usuarios',
    url: '/usuarios',
    icon: <ArticleIcon />,
    image: 'https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png',
  },
  {
    id: 2,
    name: 'Cargar Materiales',
    url: '/materiales',
    icon: <CloudUploadIcon style={{ color: 'black' }} />,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZn5213vbBu4Jy1SyE_q_UHKChY_5QQlChJE-Njv7E8je_doPNrVTTJ9QhS3Wc9NpvyGo&usqp=CAU',
  },
]
const settings = ['Cerrar sesion']

const drawerWidth = 240

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}))

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

const Sidebar = ({ children }: PRops) => {
  const user = useSelector((state: RootState) => state.auth.user)
  const dispatch = useDispatch()

  const [open, setOpen] = React.useState(false)
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

  const router = useRouter()

  const theme = useTheme()

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
    }
  }

  const handleUri = (url: string) => {
    router.push(url)
  }
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
                    color: router.pathname === item.url ? grey[300] : grey[800],
                  }}
                  onClick={() => handleUri(item.url)}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0, color: router.pathname === item.url ? grey[300] : grey[800] }} onClick={() => handleUri(item.url)} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  )
}

export default Sidebar

{
  /* <ListItemButton>
<span
  style={{
    background: router.pathname === item.url ? blue[800] : '',
    width: '100%',
    borderRadius: 5,
    padding: 4,
    display: 'flex',
    alignItems: 'center',
  }}
                <ListItemIcon style={{ color: 'white', margin: 10, display: 'flex', justifyContent: 'center' }}>{item.icon}</ListItemIcon>

> */
}
