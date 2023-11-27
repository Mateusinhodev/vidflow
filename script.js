const containerVideos = document.querySelector(".videos__container"); // Elemento DOM para selecionar o elemento HTML


async function buscarEMostrarVideos() { // Funssão assincona (async)
    try{ // Rastreador de erro
        const busca = await fetch("http://localhost:3000/videos"); // Busca a API | Retorna uma Promisse
        const videos = await busca.json(); // Executa alguma tarefa sobre a Promisse e modifica seu formato para JSON

            videos.forEach((video) => {  //Percorrendo o objeto videos
                if(video.categoria == "") { // Prevenindo erro
                    throw new Error('Vídeo não possui categoria');
                }
                // Adicionar elemento ao HTML
                containerVideos.innerHTML += ` 
                    <li class="videos__item">
                        <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                        <div class="descricao-video">
                            <img class="img-canal" src="${video.imagem} alt="Logo do Canal">
                            <h3 class="titulo-video">${video.titulo}</h3>
                            <p class="titulo-canal">${video.descricao}</p>
                            <p class="categoria" hidden>${video.categoria}</p>
                        </div>
                    </li>
                `;
            })
    } catch(error) { // Verificador de erro
        containerVideos.innerHTML = `<p>Houve um erro ao carregar os vídeos: ${error}</p>` // Mensagem de erro
}

}

buscarEMostrarVideos();

const barraDePesquisa = document.querySelector(".pesquisar__input");

barraDePesquisa.addEventListener("input", filtrarPesquisa); // Evento de input, que puxará a função de filtro
function filtrarPesquisa() { // Função de filtro barra de pesquisa
    const videos = document.querySelectorAll(".videos__item"); // Variável que armazena os videos

    if(barraDePesquisa.value != "") { // Condição para buscar o video a partir do seu titulo
        for(let video of videos) {
            let titulo = video.querySelector(".titulo-video").textContent.toLowerCase();
            let valorFiltro = barraDePesquisa.value.toLowerCase();

            if(!titulo.includes(valorFiltro)) {
                video.style.display = "none";
            } else {
                video.style.display = "block";
            }
        }
    } else {
        video.style.display = "block";
    }
}

const botaoCategoria = document.querySelectorAll(".superior__item"); // Selecionando os botões de categoria

botaoCategoria.forEach((botao) => { // Percorrendo os btoões
    let nomeCategoria = botao.getAttribute("name"); // Manipulando o valor de nome da Categoria
    botao.addEventListener("click", () => filtrarPorCategoria(nomeCategoria)); // Evento de click que chamará a função de filtro
})

function filtrarPorCategoria(filtro) { // Função de filtro categorias
    const videos = document.querySelectorAll(".videos__item"); // Variável que armazena os videos
    for(let video of videos) {
        let categoria = video.querySelector(".categoria").textContent.toLowerCase();
        let valorFiltro = filtro.toLowerCase();

        if(!categoria.includes(valorFiltro) && valorFiltro != 'tudo'){
            video.style.display = 'none';
        } else {
            video.style.display = 'block';
        }
    }
}