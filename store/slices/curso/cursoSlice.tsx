import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { InputRegister, ResponseLogin } from '../../../types/Usuario'

interface AuthState {
  isAuthenticated: boolean
  user: InputRegister | null
  token: string | null
}

const initialState: AuthState = {
  token: '',
  user: null,
  isAuthenticated: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    auth: (state, { payload }: PayloadAction<ResponseLogin>) => {
      state.token = payload.autenticarUsuario.token
      state.user = payload.autenticarUsuario.user
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.token = ''
      state.user = null
      state.isAuthenticated = false
    },
  },
})

export const { auth, logout } = authSlice.actions
