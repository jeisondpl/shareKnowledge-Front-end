import { useState } from "react"

interface data {
    error: string
    success: string
    warning: string
}

const initial: data = {
    error: '',
    success: '',
    warning: '',
}


const useAlert = (time: number = 800) => {
    const [mensaje, setMensaje] = useState<data>(initial)

    const onSuccess = (message: string) => {
        setMensaje({
            error: '',
            success: message,
            warning: '',


        })
        onclear()

    }
    const onError = (message: string) => {
        setMensaje({
            error: message,
            success: '',
            warning: '',

        })
        onclear()
    }
    const onWarning = (message: string) => {
        setMensaje({
            error: '',
            success: '',
            warning: message,
        })
        onclear()
    }

    const onclear = () => {
        setTimeout(() => {
            setMensaje(initial)
        }, time)
    }

    return { mensaje, onSuccess, onError, onWarning }
}

export default useAlert