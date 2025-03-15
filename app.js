const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const noticiaRoutes = require("./routes/noticiaRoutes");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", noticiaRoutes);

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
