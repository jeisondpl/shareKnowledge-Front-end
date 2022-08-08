import React, { memo, useState } from 'react'
import { Formik, Form } from 'formik'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import { InitialValueRegister, SchemaRegister } from './schema/SchemaRegister'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import SpUploadFile from '../../components/SpUploadFile'
import { useQuery } from '@apollo/client'
import { InputRegister, UsuariosDataAll } from '../../types/Usuario'
import { GET_ALL_DOCENTE } from '../../graphQL/front/Querys/Usuarios'
import SpAlerta from '../SpAlert'
import { CatMateriales } from '../../types/Categorias'
import { GET_ALL } from '../../graphQL/front/Querys/CatMateriales'

interface Props {
  onSubmit: (values: InputRegister) => void
  onCancel: () => void
  titleBtn?: string
  type?: 'categoria' | 'material'
}

const FormLoad = ({ onSubmit, onCancel, titleBtn = 'Registrar', type = 'material' }: Props) => {
  const [age, setAge] = useState('')
  const { data, loading, error } = useQuery<{ obtenerTodosDocentes: InputRegister[] }, InputRegister>(GET_ALL_DOCENTE)
  const { data: dataCat, loading: l, error: e } = useQuery<{ obtenerTodosCategoriaMaterial: CatMateriales[] }, CatMateriales>(GET_ALL)

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string)
  }

  return (
    <>
      <SpAlerta error={error && error.message} loading={loading} />

      <Formik
        enableReinitialize={false}
        initialValues={InitialValueRegister}
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
            <>
              {type === 'material' && (
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>Docentes</InputLabel>
                  <Select labelId='demo-simple-select-label' id='demo-simple-select' value={age} label='Age' onChange={handleChange}>
                    {data &&
                      data.obtenerTodosDocentes.map((docente: InputRegister) => (
                        <MenuItem key={docente.id} value={docente.id}>
                          {docente.nombre}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              )}
              <TextField
                margin='normal'
                fullWidth
                label={type === 'material' ? 'Nombre del curso' : 'Nombre de la categoria'}
                name='nombre'
                autoComplete='off'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nombre}
              />
              {type === 'material' && (
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>Categoria</InputLabel>
                  <Select labelId='demo-simple-select-label' id='demo-simple-select' value={age} label='Age' onChange={handleChange}>
                    {data &&
                      dataCat?.obtenerTodosCategoriaMaterial.map((categoria: CatMateriales) => (
                        <MenuItem key={categoria.id} value={categoria.id}>
                          {categoria.nombre}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
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
                    marginTop: '5px',
                  }}
                  minRows={12}
                  aria-label='maximum height'
                  placeholder={type === 'material' ? 'Descripcion del material' : 'Descripcion de la categoria'}
                />
              </FormControl>
              {type === 'material' && (
                <SpUploadFile deleteFile={() => {}} files={[]} handleFile={() => {}} multiple={false} placeholder='Haz click para seleccionar el archivo' validateSize={false} />
              )}
            </>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default memo(FormLoad)
