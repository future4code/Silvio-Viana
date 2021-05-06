import { useHistory } from "react-router"

export const useProtectPage = () => {
    const history = useHistory()

    const token = window.localStorage.getItem("token")

    if (token === null) {
        history.replace("/login")
    }
}
