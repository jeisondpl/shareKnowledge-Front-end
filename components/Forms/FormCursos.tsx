import React, { memo, useState, useEffect, useCallback } from 'react'
import { Formik, Form } from 'formik'
import { Box, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, styled, TextField, Grid, Button, DialogActions, Card, Typography } from '@mui/material'
import { SchemaRegister } from './schema/SchemaRegister'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import { InputRegister } from '../../types/Usuario'
import SpAlert from '../SpAlert'
import { CatMateriales } from '../../types/Categorias'
import SearchIcon from '@mui/icons-material/Search'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import SpModalBasic from '../SpModalBasic'
import CancelIcon from '@mui/icons-material/Cancel'
import SaveIcon from '@mui/icons-material/Save'
import { useMateriales, useCatMateriales } from '../../hooks'
import { Material } from '../../types/Materiales'
import SearchSelectTable from '../Table/SearchSelectTable'
import * as Yup from 'yup'

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

export interface InputCurso {
  id?: string
  nombre: string
  apellido: string
  email: string
  password?: string
}

const FormCursos = ({ onSubmit, onCancel, titleBtn = 'Registrar', type = 'material' }: Props) => {
  //hooks get cat materiales
  const { data, loading, error } = useCatMateriales()
  const { dataMateriales } = useMateriales()

  const [openCategorias, setOpenCategorias] = useState(false)
  const [openMaterial, setOpenMaterial] = useState(false)

  const [arrayAddMaterial, setArrayAddMaterial] = useState<Material[]>([] as Material[])
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

  const deleteAddMaterial = (id: string) => {
    const newArray = arrayAddMaterial.filter((item: Material) => item.id !== id)
    setArrayAddMaterial(newArray)
  }
  const chanqueSelect = (name: string, value: string) => {
    setselects(
      selects.map((item: any) => {
        if (item.name === name) {
          item.value = value
        }
        return item
      })
    )
  }

  const HandleChanqueSelect = (event: any) => {
    chanqueSelect(event.target.name, event.target.value)
    if (event.target.name === 'selectMaterial') {
      setArrayAddMaterial([...arrayAddMaterial, { id: event.target.value, titulo: event.target.value }])
    }
  }

  const onSelectMaterial = useCallback(
    (id: string): string => {
      if (dataMateriales) {
        const isExist = arrayAddMaterial.find((it: Material) => it.id === id)
        const resp: Material = dataMateriales.find((it: Material) => it.id === id) as Material
        if (!isExist) {
          setArrayAddMaterial([...arrayAddMaterial, resp])
          setOpenMaterial(false)
          chanqueSelect('selectMaterial', resp.titulo)
          return ''
        } else {
          return resp.titulo
        }
      } else return ''
    },
    [arrayAddMaterial]
  )

  const onSelectCatergoria = useCallback(
    (row: any): string => {
      chanqueSelect('selectCategoria', row.id)
      setOpenCategorias(false)
      return ''
    },
    [arrayAddMaterial]
  )

  interface FormValues {
    id?: string
    nombre: string
    categoria: string
    description: string
  }

  const InitialValueCurso: FormValues = {
    nombre: '',
    categoria: '',
    description: '',
  }

  const SchemaRegister = Yup.object().shape(
    Object.assign({
      nombre: Yup.string().required('Campo requerido'),
      categoria: Yup.string().required('Campo requerido'),
      description: Yup.string().required('Campo requerido'),
    })
  )
  return (
    <>
      <SpAlert error={error && error.message} loading={loading} />

      <Formik
        enableReinitialize={false}
        initialValues={InitialValueCurso}
        validationSchema={SchemaRegister}
        onSubmit={
          (values) => console.log(values)
          // onSubmit({
          //   ...values,
          //   rol: 'VERIFICACION',
          // })
        }
      >
        {({ values, handleChange, handleBlur, touched, handleSubmit, errors }) => (
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
                    <TextField
                      className='form-control'
                      label='Categoria'
                      fullWidth
                      id='categoria'
                      name='categoria'
                      variant='outlined'
                      value={values.categoria}
                      error={Boolean(touched.categoria && errors.categoria)}
                      helperText={touched.categoria ? errors.categoria : ''}
                      type='text'
                      select
                      SelectProps={{ native: true }}
                      inputProps={{
                        style: {
                          borderColor: '#019df4',
                        },
                      }}
                      onChange={handleChange}
                    >
                      <option key={0} value='' />
                      {dataMateriales?.map((item: Material) => (
                        <option key={item.id} value={item.id}>
                          {item.titulo}
                        </option>
                      ))}
                    </TextField>

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
                                label='Categoria material'
                                onChange={HandleChanqueSelect}
                              >
                                {data &&
                                  data?.map((item: CatMateriales) => (
                                    <MenuItem key={item.id} value={item.id}>
                                      {item.nombre}
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
                                name='material'
                                label='Material'
                                onChange={(e: any) => onSelectMaterial(e.target.value)}
                              >
                                {dataMateriales &&
                                  dataMateriales?.map((item: Material) => (
                                    <MenuItem key={item.id} value={item.id}>
                                      {item.titulo}
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

                    {arrayAddMaterial.length > 0 && (
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
                            arrayAddMaterial.map((material: Material) => (
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
                                  {material.titulo}
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

      {/* buscar Categorias */}
      <SpModalBasic open={openCategorias} title={'Categoria'} width={800} onClose={handleOnClose}>
        <SearchSelectTable name='Categorias' data={data ? data : []} onSelectMaterial={onSelectCatergoria} />
      </SpModalBasic>

      {/* buscar Materiales */}
      <SpModalBasic open={openMaterial} title={'Materiales'} width={800} onClose={handleOnClose}>
        <SearchSelectTable name='Materiales' data={dataMateriales ? dataMateriales : []} onSelectMaterial={onSelectMaterial} />
      </SpModalBasic>
    </>
  )
}

export default memo(FormCursos)
