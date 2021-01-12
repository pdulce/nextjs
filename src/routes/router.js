//libraries
const express = require("express")
const bodyParser = require('body-parser')
const moment = require("moment")
require('moment/locale/cs')

//my own modules
const moduleReporter = require('../utils/reporting')
const discoverWTF = require('../utils/discovery')

//constants
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.render("home.html", {title: 'Bienvenido a Home!', entry: '1'});
});

router.get("/home", (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.render("home.html", {title: 'Bienvenido a Home!', entry: 1});
});

router.get("/about", (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=UTF-8");
  res.render("about.html", {title: 'Acerca de mí', entry: 2});
});

router.get("/contact", (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=UTF-8");
  res.render("contact.html", {title: 'Contacte vía e-mail', entry: 3});
});

router.get("/reporting", (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.render("reporting.html", {title: 'Informes del contrato CDISM', entry: 4});
});

router.get("/investmentResearch", (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.render("investmentResearch.html", {title: 'ML aplicado a búsqueda de tendencias inversión', entry: 5, content: ''});
});

router.post("/discover", (req, res) => {
  
  let terminos = req.body.temas;
  discoverWTF.discover(terminos);
  //console.log("términos: " + terminos);
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.render("investmentResearch.html", {title: 'ML aplicado a búsqueda de tendencias inversión', entry: 5, content: 'fin búsqueda'});
});

router.get("/gedeones", (req, res) => {  
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.render("gedeones.html", {title: 'Consulta de Gedeones', entry: 6});
});

router.post("/genCUBO", async (req, res) => {
 
  var data = [];
  records = await moduleReporter.queryReportCUBO(data);
  bloques = moduleReporter.genReportCUBO(records);

  res.setHeader("Content-Type", "text/plain; charset=UTF-8");
  res.write(bloques);
  res.end();
});

router.post("/genCertMensualAT", async (req, res) => {
  
  var mesCertificado = moment().subtract(1, 'month').format("MM");
  //console.log(mesCertificado);
  
  var data = [];

  records = await moduleReporter.queryCertifMensualAT(data);
  bloques = moduleReporter.genCertifMensualAT(records, mesCertificado);
  
  res.setHeader("Content-Type", "text/plain; charset=UTF-8");
  res.write(bloques);
  res.end();
});

router.post("/caducanSoon", async (req, res) => {
  let diasfin = req.body.diasfin;
    
  var data = [];
  records = await moduleReporter.queryReportCaducadas(diasfin, data);
  bloques = moduleReporter.genReportCaducadas(records, diasfin);
  
  res.setHeader("Content-Type", "text/plain; charset=UTF-8");
  
  res.write(bloques);
  res.end();
});

router.post("/informePPTX", async (req, res) => {

    let fechaDesde = req.body.fecultimoComite;
    if (fechaDesde == ''){
      fechaDesde = moment().format("yyyy-MM-DD");
    }
    //console.log(`fecha desde: ${fechaDesde}`);

    var data = [];
    records = await moduleReporter.queryReportPPTX(fechaDesde, data);
    bloques = moduleReporter.genReportPPTX(records);
        
    res.setHeader("Content-Type", "text/plain; charset=UTF-8");
    res.write(bloques);
    res.end();
});

module.exports = router;//exportamos el alias router