import { ApolloError } from "@apollo/client"

export interface respMesage {
    mensaje: string
    error: ApolloError | null
  }