//libraries
const express = require("express")
const bodyParser = require('body-parser')
https = require('https')
const fs = require('fs')
const path = require("path")
const multer = require("multer")
const gtts = require("gtts")
const extract = require("pdf-text-extract")
const formidable = require('formidable')
const moment = require("moment")
require('moment/locale/cs')

//begin of definition of my own modules
const moduleReporter = require('../utils/reporting')
const discoverWTF = require('../utils/discovery')
//end of definition of my own modules

const nameOfImagen = 'newImage.jpg'
const terminos = ['saludo', 'guerra', 'valle', 'palacio', 'hispania', 'Antigua Roma', 'Mediterráneo', 'Europa', 'República', 'Pandemia', 
'filosofía', 'alquimia', 'deportes', 'escalada', 'historia del arte', 'literatura', 'geografía', 'historia', 'matemáticas', 'nuevas tecnologías']

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

/*for testing purpose 
router.get("/discovered", (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.render("received.html", {title: 'Informes del contrato CDISM', entry: 4});
});*/

router.get("/discover", async (req, res) => {
  
  let ind = Math.floor( (Math.random()*new moment()))%terminos.length;
  var termBusqueda =  new String(terminos[ind]).replace(' ','+');
  console.log('ROUTER--> término aleatorio elegido al azar de la lista prefijada: ' + termBusqueda);

  var predictionsDone = await discoverWTF.discover(termBusqueda, nameOfImagen);

  //console.log("términos: " + terminos);
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.render("research.html", 
  {title: 'ML aplicado a búsqueda de tendencias inversión', entry: 5, content: predictionsDone, 
  terminos: terminos[ind], 
  imagen: nameOfImagen});
});

router.post("/discover", async (req, res) => {
  
  let termino = req.body.temas;
  var termBusqueda =  new String(termino).replace(' ','+');
  console.log('ROUTER--> término recibido de pantalla: ' + termBusqueda);

  var predictionsDone = await discoverWTF.discover(termBusqueda, nameOfImagen);

  //console.log("términos: " + terminos);
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.render("research.html", {title: 'ML aplicado a búsqueda de tendencias inversión', 
  entry: 5, content: predictionsDone, 
  terminos: termino, 
  imagen: nameOfImagen});
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


/**  forma simple de hacer un upload de un fichero */

router.get("/uploadForm", async (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.render( "formwupload.html", 
  {title: 'Adjunte un fichero', entry: 7});
 
});

router.post("/fileupload", async (req, res) => {
  console.log('procesando fichero...');
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    
    var oldpath = files.filetoupload.path;
    var newpath = path.join(__dirname, `../public/uploads/${files.filetoupload.name}`);
    fs.rename(oldpath, newpath, function (err) {
      if (err) {
        res.render( "formwupload.html", {title: 'Error: el fichero no pudo subirse al servidor', entry: 7});
        throw err;
      }else{
        res.render( "formwupload.html", {title: '¡Fichero subido al servidor!', entry: 7});
      }
    });
  });
});
/***/

const pdfFilter = function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if (ext !== ".pdf") {
    return callback("This Extension is not supported");
  }
  callback(null, true);
};

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

router.get("/pdftoaudio", (req, res) => {
  res.render("pdftoaudio", {
    title:
      "FREE PDF to Audio Mp3 Online Tool | Convert PDF Text to Audio Mp3 Online - FreeMediaTools.com",
  });
});

var pdftoaudioupload = multer({
  storage: storage,
  fileFilter: pdfFilter,
}).single("file");

router.post("/uploadpdftoaudio", (req, res) => {
  pdftoaudioupload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    console.log('uploaded file to disk');
    res.json({
      path: req.file.path,
    });
  });
});

router.post("/pdftoaudio", (req, res) => {
  outputfile = Date.now() + "output.txt"
  extract(req.body.path, { splitPages: false }, function (err, text) {
    if (err) {
      console.dir(err);
      return;
    }
    console.log(text);
    fs.writeFileSync(outputfile, text);

    console.log(fs.readFileSync(outputfile,'utf-8'));

    var gttsVoice = new gtts(fs.readFileSync(outputfile,'utf-8'), req.body.language);

    outputFilePath = Date.now() + "output.mp3";

    gttsVoice.save(outputFilePath, function (err, result) {
      if (err) {
        fs.unlinkSync(outputFilePath);
        res.send("An error takes place in generating the audio");
      }
      res.json({
        path: outputFilePath,
      });
    });
  });
});

router.get("/download", (req, res) => {
  var pathoutput = req.query.path;
  console.log(pathoutput);
  var fullpath = path.join(__dirname, pathoutput);
  res.download(fullpath, (err) => {
    if (err) {
      fs.unlinkSync(fullpath);
      res.send(err);
    }
    fs.unlinkSync(fullpath);
  });
});


module.exports = router;//exportamos el alias router