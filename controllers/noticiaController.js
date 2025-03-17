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
    res.render("listar", { noticias }); //mostra a página com a lista
};

//Mostra o formulário para criar uma nova 
exports.formCriarNoticia = (req, res) => {
    res.render("criar"); //mostra a página para escrever uma nova notícia
};

//Cria uma nova notícia
exports.criarNoticia = (req, res) => {
    const { titulo, imagem, detalhes } = req.body; //pega os dados do formulário
    const noticia = new Noticia(null, titulo, imagem, detalhes);
    noticia.salvar();
    res.redirect("/"); //volta para a página inicial
};

//Mostra o formulário para edição
exports.formEditarNoticia = (req, res) => {
    const id = parseInt(req.params.id); // Pega o ID da notícia da URL
    const noticia = Noticia.buscarPorId(id);
    if (!noticia) {
        return res.status(404).send("Notícia não encontrada"); //se a notícia não for encontrada, mostra erro
    }
    res.render("editar", { noticia });
};

//Atualiza uma notícia existente
exports.editarNoticia = (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo, imagem, detalhes } = req.body; //pega os novos dados do formulário
    Noticia.atualizar(id, titulo, imagem, detalhes); //atualiza no banco de dados
    res.redirect("/listar"); // Volta para a lista de notícias
};

//excluir
exports.excluirNoticia = (req, res) => {
    const id = parseInt(req.params.id);
    Noticia.excluir(id);
    res.sendStatus(204);
};
