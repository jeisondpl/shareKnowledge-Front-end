import React, { memo, useState } from 'react'
import { Formik, Form } from 'formik'
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  styled,
  TextField,
  Grid,
  Button,
  DialogActions,
  Card,
  Typography,
} from '@mui/material'
import { InitialValueRegister, SchemaRegister } from './schema/SchemaRegister'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import { InputRegister } from '../../types/Usuario'
import SpAlerta from '../SpAlert'
import { CatMateriales } from '../../types/Categorias'
import SearchIcon from '@mui/icons-material/Search'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import SpModalBasic from '../SpModalBasic'
import SpTable from '../Table/SpTable'
import InputSearch from '../InputSearch'
import CancelIcon from '@mui/icons-material/Cancel'
import SaveIcon from '@mui/icons-material/Save'
import { useMateriales, useCatMateriales } from '../../hooks'
import { Material } from '../../types/Materiales'

interface Props {
  onSubmit: (values: InputRegister) => void
  onCancel: () => void
  titleBtn?: string
  type?: 'categoria' | 'material'
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  margin: theme.spacing(1),
  color: theme.palette.text.secondary,
}))

interface Material2 {
  id: string
  nombre: string
}

const InitialAddMateriales: Material2[] = [
  {
    id: '1',
    nombre: 'React js1',
  },
  {
    id: '2',
    nombre: 'Azure storage2',
  },
  {
    id: '3',
    nombre: 'Vue js3',
  },
  {
    id: '4',
    nombre: 'Angular js4',
  },
  {
    id: '5',
    nombre: 'Node js5',
  },
  {
    id: '6',
    nombre: 'Java server 6',
  },
  {
    id: '7',
    nombre: 'Mongo db7',
  },
  {
    id: '8',
    nombre: 'Mongo db8',
  },
]

export interface InputCurso {
  id?: string
  nombre: string
  apellido: string
  email: string
  password?: string
}

const FormCursos = ({ onSubmit, onCancel, titleBtn = 'Registrar', type = 'material' }: Props) => {
  const [age, setAge] = useState('')
  // const { data: dataCat, loading, error } = useQuery<{ obtenerTodosCategoriaMaterial: CatMateriales[] }, CatMateriales>(GET_ALL)

  //hooks get cat materiales
  const { data, loading, error } = useCatMateriales()

  const { data: dataMateriales, loading: loadingMaterial, error: erroMaterial } = useMateriales()

  const [openCategorias, setOpenCategorias] = useState(false)
  const [openMaterial, setOpenMaterial] = useState(false)

  const [arrayAddMaterial, setArrayAddMaterial] = useState<Material2[]>(InitialAddMateriales)

  const handleOpenModalMaterial = () => {
    setOpenMaterial(true)
  }
  const handleOpenModal = () => {
    setOpenCategorias(true)
  }
  const handleOnClose = () => {
    setOpenCategorias(false)
    setOpenMaterial(false)
  }

  const dataMaterial = ['React js', 'Azure storage', 'Vue js', '.NET es un framework', 'java']

  const deleteAddMaterial = (id: string) => {
    const newArray = arrayAddMaterial.filter((item: Material2) => item.id !== id)
    setArrayAddMaterial(newArray)
  }

  const [selects, setselects] = useState([
    {
      name: 'selectCategoria',
      value: '',
    },
    {
      name: 'selectMaterial',
      value: '',
    },
  ])

  const HandleChanqueSelect = (event: any) => {
    setselects(
      selects.map((item: any) => {
        if (item.name === event.target.name) {
          item.value = event.target.value
        }
        return item
      })
    )
    console.log(event.target)
    if (event.target.name === 'selectMaterial') {
      setArrayAddMaterial([...arrayAddMaterial, { id: event.target.value, nombre: event.target.value }])
    }
  }

  const InitialValueCurso: InputCurso = {
    id: '',
    nombre: '',
    apellido: '',
    email: '',
    password: '',
  }
  return (
    <>
      <SpAlerta error={error && error.message} loading={loading} />

      <Formik
        enableReinitialize={false}
        initialValues={InitialValueCurso}
        validationSchema={SchemaRegister}
        onSubmit={(values) =>
          onSubmit({
            ...values,
            rol: 'VERIFICACION',
          })
        }
      >
        {({ values, handleChange, handleBlur, touched, handleSubmit }) => (
          <Form
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit(e)
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <Box sx={{ flex: 'auto' }}>
                  <h1>Crear Cursos</h1>
                </Box>
                <Card sx={{ padding: '40px' }}>
                  <>
                    <TextField
                      margin='normal'
                      fullWidth
                      label={'Nombre del curso'}
                      name='nombre'
                      autoComplete='off'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.nombre}
                    />
                    {type === 'material' && (
                      <FormControl fullWidth>
                        <InputLabel id='demo-simple-select-label'>Categoria curso</InputLabel>
                        <Select labelId='demo-simple-select-label' id='demo-simple-select' value={age} label='Age' onChange={handleChange}>
                          {data &&
                            data?.obtenerTodosCategoriaMaterial.map((categoria: CatMateriales) => (
                              <MenuItem key={categoria.id} value={categoria.id}>
                                {categoria.nombre}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    )}

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth style={{ marginTop: '10px' }}>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <FormControl fullWidth>
                              <InputLabel id='demo-simple-select-label'>Categoria material</InputLabel>
                              <Select
                                labelId='demo-simple-select-label'
                                name='selectCategoria'
                                id='demo-simple-select'
                                value={selects[0].value}
                                label='Age'
                                onChange={HandleChanqueSelect}
                              >
                                {data &&
                                  data?.obtenerTodosCategoriaMaterial.map((categoria: CatMateriales) => (
                                    <MenuItem key={categoria.id} value={categoria.id}>
                                      {categoria.nombre}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                            <IconButton type='submit' sx={{ p: '10px' }} aria-label='search' onClick={handleOpenModal}>
                              <SearchIcon />
                            </IconButton>
                          </Box>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth style={{ marginTop: '10px' }}>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <FormControl fullWidth>
                              <InputLabel id='demo-simple-select-label'>Material</InputLabel>
                              <Select
                                labelId='demo-simple-select-label'
                                id='demo-simple-select'
                                name='selectMaterial'
                                value={selects[1].value}
                                label='Age'
                                onChange={HandleChanqueSelect}
                              >
                                {dataMateriales &&
                                  dataMateriales?.obtenerTodosMateriales.map((categoria: Material) => (
                                    <MenuItem key={categoria.id} value={categoria.titulo}>
                                      {categoria.titulo}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                            <IconButton type='submit' sx={{ p: '10px' }} aria-label='search' onClick={handleOpenModalMaterial}>
                              <SearchIcon />
                            </IconButton>
                          </Box>
                        </FormControl>
                      </Grid>
                    </Grid>

                    {arrayAddMaterial && (
                      <Box
                        mt={'10px'}
                        sx={{
                          display: 'flex',
                          border: '1px solid #C8EFD4',
                          flexDirection: 'column',
                          padding: '10px',
                          // borderRadius: '10px',
                          // backgroundColor: '#f5f5f5',
                        }}
                      >
                        <InputLabel id='demo-simple-select-label' style={{ margin: '10px' }}>
                          Materiales agregados
                        </InputLabel>
                        <Grid container>
                          {arrayAddMaterial &&
                            arrayAddMaterial.map((material: Material2) => (
                              <Box
                                key={material.id}
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                  paddingLeft: '10px',
                                  borderRadius: '10px',
                                  backgroundColor: '#C8EBFA',
                                  margin: '3px',
                                }}
                              >
                                <Typography variant='h6' component='div' gutterBottom>
                                  {material.nombre}
                                </Typography>

                                <IconButton type='submit' aria-label='search' style={{ color: '#CF7C89' }} onClick={() => deleteAddMaterial(material.id)}>
                                  <DeleteForeverIcon />
                                </IconButton>
                              </Box>
                            ))}
                        </Grid>
                      </Box>
                    )}
                    <FormControl fullWidth>
                      <TextareaAutosize
                        style={{
                          width: '100%',
                          height: '200px',
                          borderRadius: '10px',
                          resize: 'none',
                          fontSize: '1rem',
                          paddingLeft: '10px',
                          paddingRight: '10px',
                          maxWidth: '100%',
                          overflow: 'auto',
                          outline: 'none',
                          boxShadow: 'none',
                          border: '1px solid #C4C4C4',
                          padding: '10px',
                          marginTop: '10px',
                        }}
                        minRows={12}
                        aria-label='maximum height'
                        placeholder={'Descripcion del curso'}
                      />
                    </FormControl>
                  </>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <DialogActions>
                  <Button variant='contained' color='inherit' endIcon={<CancelIcon />} onClick={onCancel}>
                    Cancelar
                  </Button>
                  <Button type='submit' variant='contained' color='primary' endIcon={<SaveIcon />}>
                    Guardar
                  </Button>
                </DialogActions>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>

      <SpModalBasic open={openCategorias} title={''} width={800} onClose={handleOnClose}>
        <SpTable name={'Categorias'} rows={data ? data.obtenerTodosCategoriaMaterial : []} onEditOronDelete={() => {}} isAccion={false}>
          <InputSearch placeHolder={'Buscar Categoria'} />
        </SpTable>
      </SpModalBasic>

      <SpModalBasic open={openMaterial} title={''} width={800} onClose={handleOnClose}>
        <SpTable name={'Materiales'} rows={dataMateriales ? dataMateriales.obtenerTodosMateriales : []} onEditOronDelete={() => {}} isAccion={false}>
          <InputSearch placeHolder={'Buscar Categoria'} />
        </SpTable>
      </SpModalBasic>
    </>
  )
}

export default memo(FormCursos)
