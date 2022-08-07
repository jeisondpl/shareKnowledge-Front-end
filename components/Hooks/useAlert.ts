import { useState } from "react"

interface data {
    error: string
    success: string
}

const initial: data = {
    error: '',
    success: '',
}

const useAlert = () => {
    const [mensaje, setMensaje] = useState<data>(initial)

    const onSuccess = (message: string) => {
        setMensaje({
            error: '',
            success: message,
        })
        onclear()

    }

    const onError = (message: string) => {
        setMensaje({
            error: message,
            success: '',
        })
        onclear()
    }

    const onclear = () => {
        setTimeout(() => {
            setMensaje(initial)
        }, 800)
    }

    return { mensaje, onSuccess, onError }
}

export default useAlert