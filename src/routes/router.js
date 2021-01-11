//libraries
const express = require("express");
const bodyParser = require('body-parser');
const StringBuffer = require("stringbuffer");
const moment = require("moment");
const sqlite3 = require("sqlite3").verbose();
require('moment/locale/cs');

//constants
const monthList = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ];
const databaseFile = "C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\data\\sqlite\\factUTEDBLite.db";
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
  records = await genCertifMensualAT(data);

  var bloques = new StringBuffer();
  var proyectoAux = '';
  var numPeticionesMes = 0;

  for (let i = 0; i < records.length; i++) {
    var splitter_ = records[i].split("|");
    var proyecto_ = splitter_[0];
    var codGedeon_ = splitter_[1];
    var descGedeon_ = splitter_[2];
    if (proyectoAux == '' || proyecto_ != proyectoAux){
      /*if (proyectoAux != ''){
        var numPetsEnLiteral = (numPeticionesMes == 0)?' ninguna actividad en ': ((numPeticionesMes == 1)?' una actividad en ':` ${numPeticionesMes} actividades en `);
        bloques.append("\nResumen ").append("=>").append(numPetsEnLiteral).append(monthList[parseInt(mesCertificado)-1] );
        bloques.append("\n");
      }*/
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
  /*var numPetsEnLiteral = (numPeticionesMes == 0)?' ninguna actividad en ': ((numPeticionesMes == 1)?' una actividad en ':` ${numPeticionesMes} actividades en `);
  bloques.append("\nResumen ").append("=>").append(numPetsEnLiteral).append(monthList[parseInt(mesCertificado)-1] );
  bloques.append("\n");*/
  
  res.setHeader("Content-Type", "text/plain; charset=UTF-8");//letra del informe: Trebuchet MS 9 (negrita para proyecto y mes)
  res.write("Número total de actividades realizadas en " + monthList[parseInt(mesCertificado)-1] + ": " + records.length);
  res.write("\n");
  res.write(bloques.toString());
  res.end();
  
});

router.post("/genCUBO", async (req, res) => {

    //console.log("Server attends at HTTP-METHOD = POST");
    //let mes1 = req.body.mes1;
    //let mes2 =req.body.mes2;

    var mesInicial = moment().subtract(2, 'month').format("MM");
    var mesFinal = moment().subtract(1, 'month').format("MM"); //otros formatos de salida "YYYY MM DD
    
    var data = [];
    records=await genReportCUBO(data);

    var bloques = new StringBuffer();
    var contadorBloques = 0;
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
          bloques.append("\nResumen ").append("=>").append(numPets1EnLiteral).append(monthList[parseInt(mesInicial)-1] );
          bloques.append(" y").append(numPets2EnLiteral).append(monthList[parseInt(mesFinal)-1]);
          bloques.append("\n");
        }
         numPeticionesMes1 = 0;
        numPeticionesMes2 = 0;
        contadorBloques++;
        proyectoAux = proyecto_;
        mesAux = mes_;
              
        bloques.append("\n\n");
        bloques.append(proyectoAux);
        bloques.append("\n\n");
        bloques.append(monthList[parseInt(mesAux)-1]);
        bloques.append("\n");
      }
     
      //llenamos el bloque actual
      if (mes_ != mesAux){
        mesAux = mes_;
        bloques.append("\n");
        bloques.append(monthList[parseInt(mesAux)-1]);
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
    bloques.append("\nResumen ").append("=>").append(numPets1EnLiteral).append(monthList[parseInt(mesInicial)-1] );
    bloques.append(" y").append(numPets2EnLiteral).append(monthList[parseInt(mesFinal)-1]);
    bloques.append("\n");

    //console.log("num. bloques: " + contadorBloques);
    
    res.setHeader("Content-Type", "text/plain; charset=UTF-8");//letra del informe: Trebuchet MS 9 (negrita para proyecto y mes)
    res.write("Número total de actividades realizadas: " + records.length);
    res.write("\n");
    res.write(bloques.toString());
    res.end();
  
});


router.post("/caducanSoon", async (req, res) => {
  //TODO: este informe lo tienes cais hecho: parametriza con un text-input el número de días del periodo en que caducan peticiones
  
  let dias = req.body.diasfin;
  res.setHeader("Content-Type", "text/plain; charset=UTF-8");
  res.write("En construcción");
  res.write("\n");
  res.end();
});

router.post("/informePPTX", async (req, res) => {

    let fechaDesde = req.body.fecultimoComite;
    console.log(`fecha desde: ${fechaDesde}`);
      
    var data = [];
    records = await genReportPPTX(fechaDesde, data);
    
    var bloques = new StringBuffer();
    var contadorBloques = 0;
    var proyectoAux = '', areaAux = '', situacionAux = '';
    
    for (let i = 0; i < records.length; i++) {
      var splitter_ = records[i].split("|");
      var proyecto_ = splitter_[0];
      var area_ = splitter_[1];
      var situacion_ = splitter_[2];
      var codGedeon_ = splitter_[3];
      var descGedeon_ = splitter_[4];

      //console.log("situacion: " + situacion_);

      if (proyectoAux == '' || proyecto_ != proyectoAux){
                
        contadorBloques++;
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

      bloques.append("\t\t- ").append(codGedeon_).append(" - ").append(descGedeon_);
      bloques.append("\n");
      
    }//for

    //console.log("num. bloques: " + contadorBloques);
    
    res.setHeader("Content-Type", "text/plain; charset=UTF-8");
    res.write("Número total de actividades realizadas: " + records.length);
    res.write("\n");
    res.write(bloques.toString());
    res.end();
});

function genReportCUBO(arr) {
    var db = new sqlite3.Database(databaseFile);
    //strftime('%d/%m/%Y',date(i99.fecha_estado_modif)) as fecha
    var myQuery = "SELECT strftime('%m',date(i99.fecha_estado_modif)) as mes, i99.Proyecto_ID as Proyecto, i99.id as Cod_GEDEON, i99.Titulo as desc FROM incidenciasProyecto i99 LEFT OUTER JOIN subdireccion s74 ON s74.id=i99.Unidad_origen LEFT OUTER JOIN servicio s68 ON s68.id=i99.Area_origen  WHERE  ((date(i99.Fecha_de_tramitacion) between date('now','start of month','-2 month') AND date('now','start of month', '-1 day'))  OR (date(i99.fecha_estado_modif) between date('now','start of month','-2 month') AND date('now','start of month', '-1 day'))) AND (  (i99.Area_destino LIKE '7201 17G L2 ISM ATH Análisis Estructurado'  OR i99.Area_destino LIKE '7201 17G L2 ISM ATH Análisis Orientado a Objecto') OR  (i99.Tipo LIKE '%Entrega%' AND i99.Area_destino LIKE 'Desarrollo Gestionado%')) GROUP BY i99.Proyecto_ID, i99.fecha_estado_modif ORDER BY i99.Proyecto_ID, i99.fecha_estado_modif, i99.id asc";
    return new Promise((resolve,reject)=>{
      db.all(myQuery, (err, rows) => {
        if(err){
          return console.error(err.message);
        }
        rows.forEach(function (row, index) {
          //${index}->
          arr.push(`${row.Proyecto} | ${row.mes} | ${row.Cod_GEDEON} | ${row.desc}`);
        });
        resolve(arr);
      });//end of db.all
      
      db.close();

    });//end of Promise

};//end of genReportCUBO


function genCertifMensualAT(arr) {
  var db = new sqlite3.Database(databaseFile);
  var myQuery = "SELECT i99.Proyecto_ID as Proyecto, i99.id as Cod_GEDEON, i99.Titulo as desc FROM incidenciasProyecto i99 LEFT OUTER JOIN subdireccion s74 ON s74.id=i99.Unidad_origen LEFT OUTER JOIN servicio s68 ON s68.id=i99.Area_origen  WHERE ("+
  "(date(i99.Fecha_de_tramitacion) between date('now','start of month','-1 month') AND date('now','start of month','-1 day'))  OR"+
  "(date(i99.fecha_estado_modif) between date('now','start of month','-1 month') AND date('now','start of month','-1 day'))"+
  ") AND "+
    "("+
      "(i99.Area_destino LIKE '7201 17G L2 ISM ATH Análisis Estructurado'  OR i99.Area_destino LIKE '7201 17G L2 ISM ATH Análisis Orientado a Objecto') OR "+
      "(i99.Tipo LIKE '%Entrega%' AND i99.Area_destino LIKE 'Desarrollo Gestionado%')"+
    ")"+
    "AND i99.Proyecto_ID IN ('FMAR', 'FOMA', 'SANI', 'FAM2', 'FAMA', 'FRMA', 'FOM2', 'WSRT', 'WISM', 'WBOF')"+
    "ORDER BY i99.Proyecto_ID, i99.fecha_estado_modif asc";
  return new Promise((resolve,reject)=>{
    db.all(myQuery, (err, rows) => {
      if(err){
        return console.error(err.message);
      }
      rows.forEach(function (row, index) {
        //${index}->
        arr.push(`${row.Proyecto} | ${row.Cod_GEDEON} | ${row.desc}`);
      });
      resolve(arr);
    });//end of db.all
    
    db.close();

  });//end of Promise

};//end of genReportCUBO


function genReportPPTX(fechaDesde, arr) {
  var db = new sqlite3.Database(databaseFile);
  var myQuery = `SELECT i99.Proyecto_ID as Proyecto, i99.Area_destino as area, i99.id as Cod_GEDEON, i99.Estado as situacion, i99.Titulo as desc FROM incidenciasProyecto i99 LEFT OUTER JOIN subdireccion s74 ON s74.id=i99.Unidad_origen LEFT OUTER JOIN servicio s68 ON s68.id=i99.Area_origen WHERE (i99.Area_destino LIKE '7201 17G L2 ISM ATH Análisis Estructurado' OR i99.Area_destino LIKE '7201 17G L2 ISM ATH Análisis Orientado a Objecto' OR i99.Area_destino LIKE 'Desarrollo Gestionado%') AND i99.Tipo NOT LIKE '%Entrega%' AND i99.Proyecto_ID IN ('FMAR', 'FOMA', 'SANI', 'FAM2', 'FAMA', 'FRMA', 'FOM2', 'WSRT') AND (i99.Estado LIKE '%curso%' OR (i99.Estado NOT LIKE '%curso%' AND (date(i99.Fecha_de_tramitacion) between date('${fechaDesde}') AND date('now')) ) OR ( (date(i99.Fecha_fin_de_desarrollo) between date('${fechaDesde}') AND date('now')) ) OR ( (date(i99.Fecha_de_finalizacion) between date('${fechaDesde}') AND date('now')) ) 	) ORDER BY i99.Proyecto_ID, i99.Area_destino, i99.Estado, i99.id asc`;
  return new Promise((resolve,reject)=>{
    db.all(myQuery, (err, rows) => {
      if(err){
        return console.error(err.message);
      }
      rows.forEach(function (row, index) {
        //${index}->
        arr.push(`${row.Proyecto} | ${row.area} | ${row.situacion} | ${row.Cod_GEDEON} | ${row.desc}`);
      });
      resolve(arr);
    });//end of db.all
    
    db.close();

  });//end of Promise

};//end of genReportCUBO


module.exports = router;//exportamos el alias router