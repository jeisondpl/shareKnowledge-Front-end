import React, { useCallback, useEffect, useState } from 'react'
import LayoutLogin from '../layout/LayoutLogin'
import FormLogin from '../components/FormsLogin/FormLogin'
import { LOGIN_USER } from '../graphQL/front/Mutations/Usuarios'
import { InputLogin, ResponseLogin } from '../types/Usuario'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { respMesage } from '../types/Commons'
import LoadinError from '../components/LoadinError'
import { useDispatch } from 'react-redux'
import { auth } from '../store/slices/auth'

const Login = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [mensaje, setMensaje] = useState<respMesage>()
  const [autenticarUsuario, { loading, data, error }] = useMutation<ResponseLogin, { input: InputLogin }>(LOGIN_USER)

  useEffect(() => {
    if (data) {
      if (data?.autenticarUsuario.token) {
        setMensaje({ mensaje: 'Usuario Autenticado', error: null })
        localStorage.setItem('token', data.autenticarUsuario.token)
        dispatch(auth(data))
      }
      setTimeout(() => {
        data?.autenticarUsuario.token ? router.push('/') : setMensaje(undefined)
      }, 1000)
    }
    error && setMensaje({ mensaje: '', error })
  }, [data, error])

  const onSubmit = useCallback(async (values: any) => {
    await autenticarUsuario({
      variables: {
        input: values,
      },
    })
  }, [])

  return (
    <LayoutLogin>
      <LoadinError loading={loading} mensaje={mensaje} />
      <FormLogin onSubmit={onSubmit} />
    </LayoutLogin>
  )
}
export default Login
