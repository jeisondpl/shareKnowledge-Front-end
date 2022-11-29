import React, { useCallback } from 'react'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import LayoutLogin from '../layout/LayoutLogin'
import { LOGIN_USER } from '../graphQL/front/Mutations/Usuarios'
import { InputLogin, ResponseLogin } from '../types/Usuario'
import { auth } from '../store/slices/auth'
import { FormLogin } from '../components'
import { useAlert } from '../components/Hooks'

const Login = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const [autenticarUsuario, { loading, data, error }] = useMutation<ResponseLogin, { input: InputLogin }>(LOGIN_USER, { fetchPolicy: 'network-only' })

  const { onError } = useAlert()

  const onSubmit = useCallback(async (values: any) => {
    await autenticarUsuario({
      variables: {
        input: values,
      },
    })
  }, [])

  if (data?.autenticarUsuario.token) {
    dispatch(auth(data))
    localStorage.setItem('token', data.autenticarUsuario.token)
    router.push('/')
  }

  error && onError(error.message)

  return (
    <LayoutLogin>
      <FormLogin onSubmit={onSubmit} loading={loading} />
    </LayoutLogin>
  )
}
export default Login
