const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/noticias.json");

function carregarNoticias() {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function salvarNoticias(noticias) {
    fs.writeFileSync(filePath, JSON.stringify(noticias, null, 2));
}

class Noticia {
    constructor(id, titulo, imagem, detalhes) {
        this.id = id;
        this.titulo = titulo;
        this.imagem = imagem;
        this.detalhes = detalhes;
        this.data = new Date();
    }

    static listarUltimas() {
        const noticias = carregarNoticias();
        return noticias.reverse().slice(0, 2);
    }

    static listarTodas() {
        return carregarNoticias().reverse();
    }

    static buscarPorId(id) {
        const noticias = carregarNoticias();
        return noticias.find(noticia => noticia.id === id);
    }

    salvar() {
        const noticias = carregarNoticias();
        this.id = noticias.length > 0 ? noticias[noticias.length - 1].id + 1 : 1;
        noticias.push(this);
        salvarNoticias(noticias);
    }

    static atualizar(id, titulo, imagem, detalhes) {
        const noticias = carregarNoticias();
        const index = noticias.findIndex(noticia => noticia.id === id);
        if (index !== -1) {
            noticias[index] = { id, titulo, imagem, detalhes, data: new Date() };
            salvarNoticias(noticias);
        }
    }

    static excluir(id) {
        let noticias = carregarNoticias();
        noticias = noticias.filter(noticia => noticia.id !== id);
        salvarNoticias(noticias);
    }
}

module.exports = Noticia;
