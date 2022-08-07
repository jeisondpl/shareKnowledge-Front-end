import React, { memo, useState } from 'react'
import { Formik, Form } from 'formik'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import { InitialValueRegister, SchemaRegister } from './schema/SchemaRegister'
import { InputRegister } from '../../types/Usuario'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import stylesForms from '../../styles/forms.module.scss'
import SpUploadFile from '../../components/SpUploadFile'

interface Props {
  onSubmit: (values: InputRegister) => void
  onCancel: () => void
  titleBtn?: string
}

const FormLoad = ({ onSubmit, onCancel, titleBtn = 'Registrar' }: Props) => {
  const [age, setAge] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string)
  }
  return (
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
      {({ values, errors, handleChange, handleBlur, touched, handleSubmit }) => (
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit(e)
          }}
        >
          <>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Usuario</InputLabel>
              <Select labelId='demo-simple-select-label' id='demo-simple-select' value={age} label='Age' onChange={handleChange}>
                <MenuItem value={10}>Jeison</MenuItem>
                <MenuItem value={20}>Juan</MenuItem>
                <MenuItem value={30}>Jorge</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin='normal'
              fullWidth
              autoFocus
              label='Nombre del curso'
              name='nombre'
              autoComplete='off'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.nombre}
            />
            <FormControl fullWidth>
              <TextareaAutosize className={stylesForms.textArea} minRows={12} aria-label='maximum height' placeholder='Descripcion del material' />
            </FormControl>
            <SpUploadFile deleteFile={() => {}} files={[]} handleFile={() => {}} multiple={false} placeholder='Haz click para seleccionar el archivo' validateSize={false} />
          </>
        </Form>
      )}
    </Formik>
  )
}

export default memo(FormLoad)
