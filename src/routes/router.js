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

router.get("/reportingCUBO", (req, res) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.render("reportingCUBO.html", {title: 'Genere el contenido para informe bimensual de su proyecto', content: '', entry: 4});
});

router.get("/investmentResearch", (req, res) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.render("investmentResearch.html", {title: 'ML aplicado a búsqueda de tendencias inversión', entry: 5});
});

router.get("/gedeones", (req, res) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.render("gedeones.html", {title: 'Consulta de Gedeones', entry: 61});
});

router.post('/genCUBO', async (req, res) => {

    console.log("Server attends at HTTP-METHOD = POST");
    //let mes1 = req.body.mes1;
    //let mes2 =req.body.mes2;
    //console.log("router: num1 de mes: " + num1);
    //console.log("router: num2 de mes: " + num2);
    var mesInicial = moment().subtract(2, 'month');
    var mesFinal = moment().subtract(1, 'month');
    
    console.log("Mes inicial informe: " + mesInicial.format("MM"));//otros formatos "YYYY MM DD
    console.log("Mes final informe: " + mesFinal.format("MM"));

    var data = [];
    records=await genReportCUBO(data);

    var bloques = new StringBuffer();
    var contadorBloques = 0;
    var proyectoAux = '';
    var mesAux = '';
    var numPeticionesMes1 = 0;
    var numPeticionesMes2 = 0;
    // TODO: HACER EL TRATAMIENTO DE LO RECIBIDO PARA GENERAR UN STRING como el que requiere la plantilla de Word
    for (let i = 0; i < records.length; i++) {
     
      var splitter_ = records[i].split("|");
      var proyecto_ = splitter_[0];
      var mes_ = splitter_[1];
      var codGedeon_ = splitter_[2];
      var descGedeon_ = splitter_[3];
      if (proyectoAux == '' || proyecto_ != proyectoAux){
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
      if (i ==198){
        break;
      }
    }//for

    console.log("num. bloques: " + contadorBloques);
    
    res.setHeader("Content-Type", "text/plain; charset=UTF-8");
    res.write("No. peticiones: " + records.length);
    res.write("\n\n");
    res.write(bloques.toString());
    res.end();
  
  });

  function genReportCUBO(arr) {
    var db = new sqlite3.Database(databaseFile);
    //strftime('%d/%m/%Y',date(i99.fecha_estado_modif)) as fecha
    var myQuery = "SELECT strftime('%m',date(i99.fecha_estado_modif)) as mes, i99.Proyecto_ID as Proyecto, i99.id as Cod_GEDEON, i99.Titulo as desc FROM incidenciasProyecto i99 LEFT OUTER JOIN subdireccion s74 ON s74.id=i99.Unidad_origen LEFT OUTER JOIN servicio s68 ON s68.id=i99.Area_origen  WHERE  ((date(i99.Fecha_de_tramitacion) between date('now','start of month','-2 month') AND date('now','start of month', '-1 day'))  OR (date(i99.fecha_estado_modif) between date('now','start of month','-2 month') AND date('now','start of month', '-1 day'))) AND (  (i99.Area_destino LIKE '7201 17G L2 ISM ATH Análisis Estructurado'  OR i99.Area_destino LIKE '7201 17G L2 ISM ATH Análisis Orientado a Objecto') OR  (i99.Tipo LIKE '%Entrega%' AND i99.Area_destino LIKE 'Desarrollo Gestionado%')) GROUP BY i99.Proyecto_ID, i99.fecha_estado_modif ORDER BY i99.Proyecto_ID, i99.fecha_estado_modif asc";
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


module.exports = router;//exportamos el alias router