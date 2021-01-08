
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    console.log("Server attends at HTTP-METHOD = GET");
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.render("pral.html", {title: 'Bienvenido a login'});
});

router.get("/contact", (req, res) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.render("contact.html", {title: 'Bienvenido a contactos'});
});

router.get("/gedeones", (req, res) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.render("gedeones.html", {title: 'Bienvenido a consulta de Gedeones!!'});
});


module.exports = router;//exportamos el alias router