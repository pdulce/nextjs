//libraries
const express = require("express")
const bodyParser = require('body-parser')
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
  let records = await moduleReporter.queryReportCUBO(data);
  let bloques = moduleReporter.genReportCUBO(records);

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
  let records = await moduleReporter.queryReportCaducadas(diasfin, data);
  let bloques = moduleReporter.genReportCaducadas(records, diasfin);
  
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
    let records = await moduleReporter.queryReportPPTX(fechaDesde, data);
    let bloques = moduleReporter.genReportPPTX(records);
        
    res.setHeader("Content-Type", "text/plain; charset=UTF-8");
    res.write(bloques);
    res.end();
});

router.post("/graphPPTX", async (req, res) => {
  let fechaDesde = req.body.fecultimoComite;
    if (fechaDesde == ''){
      fechaDesde = moment().format("yyyy-MM-DD");
    }
    //console.log(`fecha desde: ${fechaDesde}`);

    var data = [];
    let records = await moduleReporter.queryReportPPTX(fechaDesde, data);
    let mapa = moduleReporter.genJSONReportPPTX(records);
        
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.render( "reportComite.html", {title: 'Report con Highcharts', json: mapa.series});
    //res.write(bloques);
    //res.end();
});

/**  forma simple de hacer un upload de un fichero */

router.get("/uploadForm", async (req, res) => {
  //leemos el contenido del directorio /public/generated/

  var dirmp3 = path.join(__dirname, "../public/generated");
  var listamp3 = fs.readdirSync(dirmp3);

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.render( "formwupload.html", 
  {title: 'Adjunte un fichero .pdf', converted: '#', listamp3: listamp3, entry: 7});
 
});

router.post("/fileupload", async (req, res) => {
  
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {

    res.setHeader("Content-Type", "text/html; charset=utf-8");

    //leemos el contenido del directorio /public/generated/
    var dirmp3 = path.join(__dirname, "../public/generated");
    var listamp3 = fs.readdirSync(dirmp3);
    
    var oldpath = files.filetoupload.path;
    var newpath = path.join(__dirname, `../public/uploads/${files.filetoupload.name}`);
    var ext = path.extname(newpath);
    if (ext !== ".pdf") {
      res.render( "formwupload.html", {title: `Error: el fichero ${newpath} no tiene extensión .pdf`, 
      converted: '#', listamp3: listamp3, entry: 7});
      return;
    }

    fs.rename(oldpath, newpath, function (err) {
      
      if (err) {
        console.log('Error: el fichero no pudo leerse para conversión a texto');
        throw err;
      }else{

                          /*** */
        /**** procesar PDF para generar audio file */
        
        var onlyName = path.basename(newpath).split('.')[0];
        extract(newpath, { splitPages: false }, async function (err, pages) {
          if (err) {
            console.log('error al extraer contenido del pdf');
            console.dir(err);
            return;
          }
          
          let outputTxt = path.join(__dirname, `../public/intermediated/_${onlyName}.txt`);
          let outputMp3 = path.join(__dirname, `../public/generated/${onlyName}.mp3`);
          fs.writeFileSync(outputTxt, '');
          fs.open(outputTxt, 'w', (err, fd) => {
            if (err) throw err;
            let byteswritten = 0;
            for (let i=0;i<pages.length;i++){
              fs.writeSync(fd, pages[i]);
              byteswritten += pages[i].length;
            }
            console.log(`byteswritten ${byteswritten}`)
            fs.close(fd, (err) => {
              if (err) throw err;
            });

            let gttsVoice = new gtts(fs.readFileSync(outputTxt, 'utf-8'), 'es-es');//"es" o "es-es"
            
            gttsVoice.save(outputMp3, function (err, result) {
              if (err) {
                fs.unlinkSync(outputMp3);
                console.log("An error takes place in generating the audio");
              }
              console.log('fichero mp3 grabado en disco!');
            });

          });
          
        });
        /**** */
        res.render( "formwupload.html", {title: `¡Fichero ${onlyName} subido al servidor!`, 
        converted:`${onlyName}.mp3`, listamp3: listamp3, entry: 7});
        console.log('fichero subido al server...');
      }
    });
  });

});
/***/

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