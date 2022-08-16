import React, { useCallback, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import LayoutLogin from '../layout/LayoutLogin'
import { LOGIN_USER } from '../graphQL/front/Mutations/Usuarios'
import { InputLogin, ResponseLogin } from '../types/Usuario'
import { auth } from '../store/slices/auth'
import { FormLogin, SpAlert } from '../components'
import { useAlert } from '../components/Hooks'

const Login = () => {
  const router = useRouter()
  const dispatch = useDispatch()
 
  const [autenticarUsuario, { loading, data, error }] = useMutation<ResponseLogin, { input: InputLogin }>(LOGIN_USER, { fetchPolicy: 'network-only' })
  
  const { onSuccess, onError, mensaje } = useAlert()



  useEffect(() => {
    if (data && data?.autenticarUsuario.token) {
      onSuccess('Usuario autenticado')
      localStorage.setItem('token', data.autenticarUsuario.token)
      dispatch(auth(data))
      setTimeout(() => {
        router.push('/')
      }, 800)
    }
    error && onError(error.message)
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
      <FormLogin onSubmit={onSubmit} />
    </LayoutLogin>
  )
}
export default Login
