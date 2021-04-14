import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

export const useInput = () => {
    
    const [value, setValue] = useState("")

    const handleInput = (event) => {
        setValue(event.target.value)
    }

    const clearInput = () => {
        setValue("")
    }

    return [value, handleInput, clearInput]
}

export const useId = () => {
    
    const [id, setId] = useState("")
    const [value, setValue] = useState("")

    const handleEvent = (event) => {
        setId(event.target[event.target.selectedIndex].id)
        setValue(event.target.value)
    }
    const clearInput = () => {
        setValue("")
        setId("")
    }

    return [id, handleEvent, value, clearInput]
}

export const useProtectedPage = () => {
    const history = useHistory()

    useEffect(() => {
        const token = window.localStorage.getItem("token")

        if (token === null) {
            history.replace("/login")
        }
    }, [history])
}
