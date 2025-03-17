const Noticia = require("../models/noticia");

exports.mostrarHome = (req, res) => {
    const noticias = Noticia.listarUltimas();
    res.render("index", { noticias });
};

exports.listarNoticias = (req, res) => {
    const noticias = Noticia.listarTodas();
    res.render("listar", { noticias });
};

exports.formCriarNoticia = (req, res) => {
    res.render("criar");
};

exports.criarNoticia = (req, res) => {
    const { titulo, imagem, detalhes } = req.body;
    const noticia = new Noticia(null, titulo, imagem, detalhes);
    noticia.salvar();
    res.redirect("/");
};

exports.formEditarNoticia = (req, res) => {
    const id = parseInt(req.params.id);
    const noticia = Noticia.buscarPorId(id);
    if (!noticia) {
        return res.status(404).send("Notícia não encontrada");
    }
    res.render("editar", { noticia });
};

exports.editarNoticia = (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo, imagem, detalhes } = req.body;
    Noticia.atualizar(id, titulo, imagem, detalhes);
    res.redirect("/listar");
};

exports.excluirNoticia = (req, res) => {
    const id = parseInt(req.params.id);
    Noticia.excluir(id);
    res.sendStatus(204);
};
