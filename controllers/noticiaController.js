//Importa o modelo Noticia, que tem as funções para mexer com as notícias
const Noticia = require("../models/noticia");

//Mostra a página inicial com as últimas notícias
exports.mostrarHome = (req, res) => {
    const noticias = Noticia.listarUltimas();
    res.render("index", { noticias });
};

//lista 
exports.listarNoticias = (req, res) => {
    const noticias = Noticia.listarTodas();
    res.render("listar", { noticias });
};

//Mostra o formulário para criar uma nova 
exports.formCriarNoticia = (req, res) => {
    res.render("criar");
};

//Cria uma nova notícia
exports.criarNoticia = (req, res) => {
    const { titulo, imagem, detalhes } = req.body;
    const noticia = new Noticia(null, titulo, imagem, detalhes);
    noticia.salvar();
    res.redirect("/");
};

//Mostra o formulário para edição
exports.formEditarNoticia = (req, res) => {
    const id = parseInt(req.params.id); // Pega o ID da notícia da URL
    const noticia = Noticia.buscarPorId(id);
    if (!noticia) {
        return res.status(404).send("Notícia não encontrada");
    }
    res.render("editar", { noticia });
};

//Atualiza uma notícia existente
exports.editarNoticia = (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo, imagem, detalhes } = req.body;
    Noticia.atualizar(id, titulo, imagem, detalhes);
    res.redirect("/listar"); // Volta para a lista de notícias
};

//excluir
exports.excluirNoticia = (req, res) => {
    const id = parseInt(req.params.id);
    Noticia.excluir(id);
    res.redirect("/listar");
};
