const express = require("express");
const router = express.Router();
const noticiaController = require("../controllers/noticiaController");

router.get("/", noticiaController.mostrarHome);
router.get("/listar", noticiaController.listarNoticias);
router.get("/criar", noticiaController.formCriarNoticia);
router.post("/criar", noticiaController.criarNoticia);
router.get("/editar/:id", noticiaController.formEditarNoticia);
router.post("/editar/:id", noticiaController.editarNoticia);
router.get("/excluir/:id", noticiaController.excluirNoticia);


module.exports = router;
