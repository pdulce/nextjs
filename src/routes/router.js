
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    console.log("Server attends at HTTP-METHOD = GET");
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.render("home.html", {title: 'Bienvenido a Home!', entry: '1'});
});

router.get("/home", (req, res) => {
    console.log("Server attends at HTTP-METHOD = GET");
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.render("home.html", {title: 'Bienvenido a Home!', entry: 1});
});

router.get("/about", (req, res) => {
    res.setHeader("Content-Type", "text/html; charset=iso-8859-1");
    res.render("about.html", {title: 'Acerca de mí', entry: 2});
});

router.get("/contact", (req, res) => {
    res.setHeader("Content-Type", "text/html; charset=iso-8859-1");
    res.render("contact.html", {title: 'Contacte vía e-mail', entry: 3});
});

router.get("/reportingCUBO", (req, res) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.render("reportingCUBO.html", {title: 'Reporte bimensual Calidad Babel (CUBO)', entry: 4});
});

router.get("/investmentResearch", (req, res) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.render("investmentResearch.html", {title: 'ML aplicado a búsqueda de tendencias inversión', entry: 5});
});

router.get("/gedeones", (req, res) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.render("gedeones.html", {title: 'Consulta de Gedeones', entry: 61});
});

module.exports = router;//exportamos el alias router