import React, { useCallback, useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import LayoutLogin from '../layout/LayoutLogin'
import FormRegister from '../components/Forms/FormRegister'
import { CREATE_USER } from '../graphQL/front/Mutations/Usuarios'
import { InputRegister } from '../types/Usuario'
import { useRouter } from 'next/router'
import useAlert from '../components/Hooks/useAlert'
import SpAlerta from '../components/SpAlert'

const Registrar = () => {
  const router = useRouter()
  const [nuevoUsuario, { loading, data, error }] = useMutation<{ nuevoUsuario: InputRegister }, { input: InputRegister }>(CREATE_USER)
  const { onSuccess, onError, mensaje } = useAlert()

  useEffect(() => {
    if (data) {
      onSuccess('Usuario registrado')
      setTimeout(() => {
        router.push('/login')
      }, 900)
    }
    error && onError(error.message)
  }, [data, error])

  const onSubmit = useCallback(async (input: InputRegister) => {
    await nuevoUsuario({
      variables: { input },
    })
  }, [])

  return (
    <LayoutLogin>
      <FormRegister onSubmit={onSubmit} />
      <SpAlerta success={mensaje.success} loading={loading} error={mensaje.error} />
    </LayoutLogin>
  )
}
export default Registrar
