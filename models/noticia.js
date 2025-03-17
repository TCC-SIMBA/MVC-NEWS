//Importa os módulos
const fs = require("fs");
const path = require("path");

//Define o caminho do arquivo onde serão salvas
const filePath = path.join(__dirname, "../data/noticias.json");

function carregarNoticias() {
    //Se o arquivo não existir, cria um vazio
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]));
    }
    //Lê o arquivo e transforma em array de notícias
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function salvarNoticias(noticias) {
    fs.writeFileSync(filePath, JSON.stringify(noticias, null, 2)); //Salva  formatado
}

class Noticia {
    constructor(id, titulo, imagem, detalhes) {
        this.id = id;
        this.titulo = titulo;
        this.imagem = imagem;
        this.detalhes = detalhes;
        this.data = new Date();
    }

    // Pega as últimas duas adicionadas
    static listarUltimas() {
        const noticias = carregarNoticias();
        return noticias.reverse().slice(0, 2); //Reverte a ordem
    }

    static listarTodas() {
        return carregarNoticias().reverse(); //Retorna as notícias na ordem mais recente
    }

    static buscarPorId(id) {
        const noticias = carregarNoticias();
        return noticias.find(noticia => noticia.id === id);
    }

    //Salvando
    salvar() {
        const noticias = carregarNoticias();
        this.id = noticias.length > 0 ? noticias[noticias.length - 1].id + 1 : 1;
        noticias.push(this);
        salvarNoticias(noticias);
    }

     //Atualizando
    static atualizar(id, titulo, imagem, detalhes) {
        const noticias = carregarNoticias();
        const index = noticias.findIndex(noticia => noticia.id === id); //Procura a posição da notícia
        if (index !== -1) {
            noticias[index] = { id, titulo, imagem, detalhes, data: new Date() };
            salvarNoticias(noticias); // Salva as mudanças
        }
    }

      //Exclui uma notícia pelo ID
    static excluir(id) {
        let noticias = carregarNoticias();
        noticias = noticias.filter(noticia => noticia.id !== id);
        salvarNoticias(noticias);
    }
}

//Exporta a classe Noticia
module.exports = Noticia;
