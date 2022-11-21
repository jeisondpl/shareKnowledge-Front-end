import React, { memo } from 'react'
import { Formik, Form } from 'formik'
import { Button, TextField } from '@mui/material'
import FormErrorMessage from './FormMessageError'
import { InitialValueRegister, SchemaRegister } from './schema/SchemaRegister'
import { InputRegister } from '../../types/Usuario'

interface Props {
  onSubmit: (values: InputRegister) => void
  titleBtn?: string
  selectData?: any
}

const FormRegister = ({ onSubmit, titleBtn = 'Registrar', selectData }: Props) => {
  console.log('selectData :', selectData)
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
            <TextField margin='normal' fullWidth autoFocus label='Nombre' name='nombre' autoComplete='off' onBlur={handleBlur} onChange={handleChange} value={values.nombre} />
            <FormErrorMessage nameField={'nombre'} error={errors} touched={touched} />
            <TextField margin='normal' fullWidth name='apellido' label='Apellido' autoComplete='off' onBlur={handleBlur} onChange={handleChange} value={values.apellido} />
            <FormErrorMessage nameField={'apellido'} error={errors} touched={touched} />
            <TextField margin='normal' fullWidth label='Correo electrónico' name='email' autoComplete='off' onBlur={handleBlur} onChange={handleChange} value={values.email} />
            <FormErrorMessage nameField={'email'} error={errors} touched={touched} />
            <TextField
              margin='normal'
              fullWidth
              name='password'
              label='Contraseña'
              type='password'
              onBlur={handleBlur}
              autoComplete='off'
              onChange={handleChange}
              value={values.password}
            />
            <FormErrorMessage nameField={'password'} error={errors} touched={touched} />
            <div></div>
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              {titleBtn}
            </Button>
          </>
        </Form>
      )}
    </Formik>
  )
}

export default memo(FormRegister)
