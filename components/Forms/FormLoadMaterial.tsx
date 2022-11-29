import React, { memo, useState } from 'react'
import { Formik, Form } from 'formik'
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import { InitialValueRegister, SchemaRegister } from './schema/SchemaRegister'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import SpUploadFile from '../../components/SpUploadFile'
import { useQuery } from '@apollo/client'
import { InputRegister } from '../../types/Usuario'
import SpAlert from '../SpAlert'
import { CatMateriales } from '../../types/Categorias'
import { GET_ALL_SELET } from '../../graphQL/front/Querys/CatMateriales'

interface Props {
  onSubmit: (values: InputRegister) => void
  onCancel: () => void
  titleBtn?: string
  type?: 'categoria' | 'material'
  selectData?: CatMateriales
}

const FormLoad = ({ onSubmit, onCancel, titleBtn = 'Registrar', type = 'material', selectData }: Props) => {
  const [age, setAge] = useState('')

  const { data: dataCat, loading, error } = useQuery<{ obtenerTodosCatSelect: CatMateriales[] }, CatMateriales>(GET_ALL_SELET)

  console.log(dataCat)

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string)
  }

  return (
    <>
      <SpAlert error={error && error.message} loading={loading} />

      <Formik
        enableReinitialize={false}
        initialValues={{
          nombre: '',
          categoria: '',
          descripcion: '',
          file: '',
        }}
        validationSchema={SchemaRegister}
        onSubmit={
          (values) => console.log(values)
          // onSubmit({
          //   ...values,
          // })
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
              <TextField
                id='nombre'
                margin='normal'
                fullWidth
                label={type === 'material' ? 'nombre del material' : 'nombre de la nombre'}
                name='nombre'
                autoComplete='off'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nombre}
              />

              {type === 'material' && (
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>Categoria</InputLabel>
                  <Select name='categoria' labelId='demo-simple-select-label' id='categoria' value={age} label='Age' onChange={handleChange}>
                    {dataCat &&
                      dataCat?.obtenerTodosCatSelect.map((categoria: CatMateriales) => (
                        <MenuItem key={categoria.id} value={categoria.id}>
                          {categoria.nombre}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              )}
              <FormControl fullWidth>
                <TextareaAutosize
                  name='descripcion'
                  id='descripcion'
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
              <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                Crear material
              </Button>
            </>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default memo(FormLoad)
