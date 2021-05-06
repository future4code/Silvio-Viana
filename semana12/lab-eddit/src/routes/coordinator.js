export const goToLogin = (history) => {
    history.push("/login")
}

export const goToCadastro = (history) => {
    history.push("/cadastro")
}

export const goToFeed = (history) => {
    history.push("/")
}

export const goToPost = (history, id) => {
    history.push(`/post/${id}`)
}

export const goToLogout = (history) => {
    window.localStorage.removeItem("token")
    history.replace("/login")
}