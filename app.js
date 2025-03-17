//Importa os módulos necessários
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express(); //Cria o aplicativo Express
const noticiaRoutes = require("./routes/noticiaRoutes");

//Configura a visualização
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Define a pasta onde estão os arquivos 

//Configura a pasta
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//Usa as rotas definida
app.use("/", noticiaRoutes);

//Importa o method-override para permitir métodos
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

//Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
