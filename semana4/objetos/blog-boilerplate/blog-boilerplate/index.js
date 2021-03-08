//O exercício não exigia o uso do array criado
let listaPosts = []

const criarPost = () => {
    const titulo = document.getElementById("titulo-post").value
    const autor = document.getElementById("autor-post").value
    const conteudo = document.getElementById("conteudo-post").value
    const imagem = document.getElementById("imagem-post").value
    if (titulo === "" || autor === "" || conteudo === "") {
        alert("Título, Autor e Conteúdo são campos obrigatórios")
        return
    }
    
    const formulario = {
        titulo: titulo,
        autor: autor,
        conteudo: conteudo,
        imagem: imagem
    }
    listaPosts.push(formulario)

    document.getElementById("imagem-post").value = ""
    document.getElementById("titulo-post").value = ""
    document.getElementById("autor-post").value = ""
    document.getElementById("conteudo-post").value = ""
    adicionarPost()
}

function adicionarPost() {
    document.getElementById("container-de-posts").innerHTML = ""
    for (post of listaPosts) {
        document.getElementById("container-de-posts").innerHTML += `<h1>Título: ${post.titulo}</h1> 
        <h3>Autor: ${post.autor}</h3>
        <img src="${post.imagem}"> <p>Conteúdo: ${post.conteudo}</p>`
    }
}
