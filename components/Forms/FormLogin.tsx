import React, { memo } from 'react'
import { Formik, Form } from 'formik'
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material'
import FormErrorMessage from './FormMessageError'
import { SchemaLogin, InitialValueLogin } from './schema/SchemaLogin'
import { InputLogin } from '../../types/Usuario'
import SpLoading from '../SpLoading'

interface Props {
  onSubmit: (values: InputLogin) => void
  loading: boolean
}

const FormLogin = ({ onSubmit,loading }: Props) => {
  return (
    <Formik enableReinitialize={false} initialValues={InitialValueLogin} validationSchema={SchemaLogin} onSubmit={(values) => onSubmit(values)}>
      {({ values, errors, handleChange, handleSubmit, handleBlur, touched }) => (
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit(e)
          }}
        >
          <>
            <TextField
              margin='normal'
              fullWidth
              label='Correo electrónico'
              name='email'
              autoComplete='off'
              autoFocus
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
            />
            <FormErrorMessage nameField={'email'} error={errors} touched={touched} />
            <TextField
              margin='normal'
              fullWidth
              name='password'
              label='Contraseña'
              type='password'
              autoComplete='off'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
            />
            <FormErrorMessage nameField={'password'} error={errors} touched={touched} />
            <div></div>
            <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Recordar' />
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }} endIcon={loading && <SpLoading loading={true} color='inherit' />}>
              {!loading && 'Iniciar sesión'}
            </Button>
          </>
        </Form>
      )}
    </Formik>
  )
}

export default memo(FormLogin)
