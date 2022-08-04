import React, { useCallback, useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import LayoutLogin from '../layout/LayoutLogin'
import FormRegister from '../components/FormsLogin/FormRegister'
import { CREATE_USER } from '../graphQL/Mutations/Usuarios'
import LoadinError from '../components/LoadinError'
import { respMesage } from '../types/Commons'
import { InputRegister } from '../types/Usuario'
import { useRouter } from 'next/router'

const Registrar = () => {
  const router = useRouter()
  const [nuevoUsuario, { loading, data, error }] = useMutation<{ nuevoUsuario: InputRegister }, { input: InputRegister }>(CREATE_USER)
  const [mensaje, setMensaje] = useState<respMesage>()

  useEffect(() => {
    let isCreated = false
    if (data) {
      setMensaje({ mensaje: 'Usuario creado correctamente', error: null })
      isCreated = true
    }
    if (error) {
      setMensaje({ mensaje: '', error })
    }
    setTimeout(() => {
      isCreated ? router.push('/login') : setMensaje(undefined)
    }, 3000)
  }, [data, error])

  const onSubmit = useCallback(async (values: InputRegister) => {
    await nuevoUsuario({
      variables: {
        input: values,
      },
    })
  }, [])

  return (
    <LayoutLogin>
      <LoadinError loading={loading} mensaje={mensaje} />
      <FormRegister onSubmit={onSubmit} />
    </LayoutLogin>
  )
}
export default Registrar
