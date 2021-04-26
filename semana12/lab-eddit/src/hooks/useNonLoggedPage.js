import { useEffect } from "react"
import { useHistory } from "react-router"

export const useNonLoggedPage = () => {
    const history = useHistory()

    useEffect(() => {
        const token = window.localStorage.getItem("token")

        if (token !== null) {
            history.replace("/")
        }
    }, [history])
}