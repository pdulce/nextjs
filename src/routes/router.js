//libraries
const express = require("express");
const bodyParser = require('body-parser');
const moduleImport1 = require('../utils/reporting');
const StringBuffer = require("stringbuffer");
const moment = require("moment");
require('moment/locale/cs');

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
  res.render("investmentResearch.html", {title: 'ML aplicado a búsqueda de tendencias inversión', entry: 5});
});

router.get("/gedeones", (req, res) => {  
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.render("gedeones.html", {title: 'Consulta de Gedeones', entry: 6});
});

router.post("/genCertMensualAT", async (req, res) => {
  
  var mesCertificado = moment().subtract(1, 'month').format("MM");
  var data = [];

  records = await moduleImport1.genCertifMensualAT(data);

  var bloques = new StringBuffer();
  var proyectoAux = '';
  var numPeticionesMes = 0;

  for (let i = 0; i < records.length; i++) {
    var splitter_ = records[i].split("|");
    var proyecto_ = splitter_[0];
    var codGedeon_ = splitter_[1];
    var descGedeon_ = splitter_[2];
    if (proyectoAux == '' || proyecto_ != proyectoAux){
      numPeticionesMes = 0;
      proyectoAux = proyecto_;
                 
      bloques.append("\n\n");
      bloques.append(proyectoAux);
      bloques.append("\n\n");
    }
    
    //llenamos el bloque actual
    bloques.append("-  ").append(codGedeon_).append(" - ").append(descGedeon_);
    bloques.append("\n"); 
    numPeticionesMes++;
  }//for 
  res.setHeader("Content-Type", "text/plain; charset=UTF-8");//letra del informe: Trebuchet MS 9 (negrita para proyecto y mes)
  res.write("Número total de actividades realizadas en " + moduleImport1.monthList[parseInt(mesCertificado)-1] + ": " + records.length);
  res.write("\n");
  res.write(bloques.toString());
  res.end();
});

router.post("/genCUBO", async (req, res) => {

    var mesInicial = moment().subtract(2, 'month').format("MM");
    var mesFinal = moment().subtract(1, 'month').format("MM"); //otros formatos de salida "YYYY MM DD
    
    var data = [];
    records=await moduleImport1.genReportCUBO(data);

    var bloques = new StringBuffer();
    var proyectoAux = '', mesAux = '';
    var numPeticionesMes1 = 0, numPeticionesMes2 = 0;

    for (let i = 0; i < records.length; i++) {
      var splitter_ = records[i].split("|");
      var proyecto_ = splitter_[0];
      var mes_ = splitter_[1];
      var codGedeon_ = splitter_[2];
      var descGedeon_ = splitter_[3];
      if (proyectoAux == '' || proyecto_ != proyectoAux){
        if (proyectoAux != ''){
          var numPets1EnLiteral = (numPeticionesMes1 == 0)?' ninguna actividad en ': ((numPeticionesMes1 == 1)?' una actividad en ':` ${numPeticionesMes1} actividades en `);
          var numPets2EnLiteral = (numPeticionesMes2 == 0)?' ninguna actividad en ': ((numPeticionesMes2 == 1)?' una actividad en ':` ${numPeticionesMes2} actividades en `);
          bloques.append("\nResumen ").append("=>").append(numPets1EnLiteral).append(moduleImport1.monthList[parseInt(mesInicial)-1] );
          bloques.append(" y").append(numPets2EnLiteral).append(moduleImport1.monthList[parseInt(mesFinal)-1]);
          bloques.append("\n");
        }
         numPeticionesMes1 = 0;
        numPeticionesMes2 = 0;
        proyectoAux = proyecto_;
        mesAux = mes_;
              
        bloques.append("\n\n");
        bloques.append(proyectoAux);
        bloques.append("\n\n");
        bloques.append(moduleImport1.monthList[parseInt(mesAux)-1]);
        bloques.append("\n");
      }
     
      //llenamos el bloque actual
      if (mes_ != mesAux){
        mesAux = mes_;
        bloques.append("\n");
        bloques.append(moduleImport1.monthList[parseInt(mesAux)-1]);
        bloques.append("\n");
      }
      bloques.append("-  ").append(codGedeon_).append(" - ").append(descGedeon_);
      bloques.append("\n");
      
      if (parseInt(mesAux) == parseInt(mesInicial)){
        numPeticionesMes1++;
      }else if (parseInt(mesAux)  == parseInt(mesFinal)){
        numPeticionesMes2++;
      }
      
    }//for

    var numPets1EnLiteral = (numPeticionesMes1 == 0)?' ninguna actividad en ': ((numPeticionesMes1 == 1)?' una actividad en ':` ${numPeticionesMes1} actividades en `);
    var numPets2EnLiteral = (numPeticionesMes2 == 0)?' ninguna actividad en ': ((numPeticionesMes2 == 1)?' una actividad en ':` ${numPeticionesMes2} actividades en `);
    bloques.append("\nResumen ").append("=>").append(numPets1EnLiteral).append(moduleImport1.monthList[parseInt(mesInicial)-1] );
    bloques.append(" y").append(numPets2EnLiteral).append(moduleImport1.monthList[parseInt(mesFinal)-1]);
    bloques.append("\n");
   
    res.setHeader("Content-Type", "text/plain; charset=UTF-8");//letra del informe: Trebuchet MS 9 (negrita para proyecto y mes)
    res.write("Número total de actividades realizadas: " + records.length);
    res.write("\n");
    res.write(bloques.toString());
    res.end();
  
});

router.post("/caducanSoon", async (req, res) => {
  let diasfin = req.body.diasfin;
  console.log(`días próximos en que terminan gedeones: ${diasfin}`);
    
  var data = [];
  records = await moduleImport1.genReportCaducadas(diasfin, data);
  
  var bloques = new StringBuffer();
  var proyectoAux = '', areaAux = '', fechaFinAux = '';
  
  for (let i = 0; i < records.length; i++) {
    var splitter_ = records[i].split("|");
    var proyecto_ = splitter_[0];
    //var origendpto_ = splitter_[1];
    //var centroOrigen_ = splitter_[2];
    var codGedeon_ = splitter_[3];
    var fechaFin_ = splitter_[4];
    var tipo_ = splitter_[5];
    var area_ = splitter_[6];
    var situacion_ = splitter_[7];
    //var fecFechaNecesidad_ = splitter_[8];  
    var descGedeon_ = splitter_[9];
    //`${row.Proyecto} | ${row.area_origen} | ${row.centro_origen} | ${row.Cod_GEDEON} | ${row.fecFechaFin} | ${row.tipo} | ${row.destino} | ${row.situacion} | ${row.fecNecesidad} | ${row.desc}`);
 
    if (proyectoAux == '' || proyecto_ != proyectoAux){
              
      proyectoAux = proyecto_;
      areaAux = area_;
      fechaFinAux = fechaFin_;
      var day = moment(fechaFinAux.split(" ")[1]);
      bloques.append("\n\n");
      bloques.append(proyectoAux);
      bloques.append("\n\n");
      bloques.append("\t" + areaAux);
      bloques.append("\n\n");
      bloques.append("\t\t" + day.format("DD/MM/yyyy"));
      bloques.append("\n\n");     
    }
    
    //llenamos el bloque actual
    if (area_ != areaAux){
      areaAux = area_;
      var day = moment(fechaFinAux.split(" ")[1]);
      bloques.append("\n");
      bloques.append("\t" + areaAux);
      bloques.append("\n\n");
      bloques.append("\t\t" + day.format("DD/MM/yyyy"));
      bloques.append("\n\n");
    }
    if (fechaFin_ != fechaFinAux){
      fechaFinAux = fechaFin_;
      var day = moment(fechaFinAux.split(" ")[1]);
      bloques.append("\n");
      bloques.append("\t\t" + day.format("DD/MM/yyyy"));//formatea la fecha con la librería moment
      bloques.append("\n\n");
    }
    
    bloques.append("\t\t\t- ").append(situacion_).append(" - ").append(tipo_).append(" - ").append(codGedeon_).append(" - ").append(descGedeon_);
    bloques.append("\n");
    
  }//for

  res.setHeader("Content-Type", "text/plain; charset=UTF-8");
  res.write(`Número total de actividades que van a finalizar en los próximos ${diasfin} días => ${records.length}`);
  res.write("\n");
  res.write(bloques.toString());
  res.end();
});

router.post("/informePPTX", async (req, res) => {

    let fechaDesde = req.body.fecultimoComite;
    if (fechaDesde == ''){
      fechaDesde = moment().format("yyyy-MM-DD");
    }
    console.log(`fecha desde: ${fechaDesde}`);

    var data = [];
    records = await moduleImport1.genReportPPTX(fechaDesde, data);
    
    var bloques = new StringBuffer();
    var proyectoAux = '', areaAux = '', situacionAux = '';
    
    for (let i = 0; i < records.length; i++) {
      var splitter_ = records[i].split("|");
      var proyecto_ = splitter_[0];
      var area_ = splitter_[1];
      var situacion_ = splitter_[2];
      var codGedeon_ = splitter_[3];
      var descGedeon_ = splitter_[4];

      if (proyectoAux == '' || proyecto_ != proyectoAux){
        proyectoAux = proyecto_;
        areaAux = area_;
        situacionAux = situacion_;
              
        bloques.append("\n\n");
        bloques.append(proyectoAux);
        bloques.append("\n\n");
        bloques.append("\t" + areaAux);
        bloques.append("\n\n");
        bloques.append("\t\t" + situacionAux);
        bloques.append("\n\n");
      }
     
      //llenamos el bloque actual
      if (area_ != areaAux){
        areaAux = area_;
        bloques.append("\n");
        bloques.append("\t" + areaAux);
        bloques.append("\n\n");
        bloques.append("\t\t" + situacionAux);
        bloques.append("\n\n");
      }
      if (situacion_ != situacionAux){
        situacionAux = situacion_;
        bloques.append("\n");
        bloques.append("\t\t" + situacionAux);
        bloques.append("\n\n");
      }

      bloques.append("\t\t\t- ").append(codGedeon_).append(" - ").append(descGedeon_);
      bloques.append("\n");
      
    }//for

    res.setHeader("Content-Type", "text/plain; charset=UTF-8");
    res.write("Número total de actividades realizadas: " + records.length);
    res.write("\n");
    res.write(bloques.toString());
    res.end();
});

module.exports = router;//exportamos el alias router