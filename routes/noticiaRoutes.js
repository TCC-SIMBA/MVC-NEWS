//importações
const express = require("express");
const router = express.Router();

//Importa o controller de notícias
const noticiaController = require("../controllers/noticiaController");

//cria todas as rotas necessárias
router.get("/", noticiaController.mostrarHome);
router.get("/listar", noticiaController.listarNoticias);
router.get("/criar", noticiaController.formCriarNoticia);
router.post("/criar", noticiaController.criarNoticia);
router.get("/editar/:id", noticiaController.formEditarNoticia);
router.post("/editar/:id", noticiaController.editarNoticia);
router.delete("/excluir/:id", noticiaController.excluirNoticia);


module.exports = router;
