import { useState } from 'react'

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