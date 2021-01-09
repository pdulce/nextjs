//libraries
const express = require("express");
const bodyParser = require('body-parser');
const StringBuffer = require("stringbuffer");
const sqlite3 = require("sqlite3").verbose();

//constants
const databaseFile = "C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\data\\sqlite\\factUTEDBLite.db";
const router = express.Router();

//vars
var data = [];

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
    res.setHeader("Content-Type", "text/html; charset=iso-8859-1");
    res.render("about.html", {title: 'Acerca de mí', entry: 2});
});

router.get("/contact", (req, res) => {
    res.setHeader("Content-Type", "text/html; charset=iso-8859-1");
    res.render("contact.html", {title: 'Contacte vía e-mail', entry: 3});
});

router.get("/reportingCUBO", (req, res) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.render("reportingCUBO.html", {title: 'Genere el contenido para informe bimensual de su proyecto', entry: 4});
});

router.get("/investmentResearch", (req, res) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.render("investmentResearch.html", {title: 'ML aplicado a búsqueda de tendencias inversión', entry: 5});
});

router.get("/gedeones", (req, res) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.render("gedeones.html", {title: 'Consulta de Gedeones', entry: 61});
});

router.post('/genCUBO', (req, res) => {
    console.log("Server attends at HTTP-METHOD = POST");
    let num1=req.body.mes1;
    let num2=req.body.mes2;

    //console.log("router: num1 de mes: " + num1);
    //console.log("router: num2 de mes: " + num2);

    asyncCall();
    
   

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.render("reportingCUBO.html", {title: 'Reporte bimensual Calidad Babel (CUBO) concluido', entry: 4});
  
  });

  async function asyncCall(){
    records=await genReportCUBO();

    leidos = 0;
    results = new StringBuffer(); 
    // TODO: HACER EL TRATAMIENTO DE LO RECIBIDO PARA GENERAR UN STRING--> LUEOG VER COMO METERLO EN PANTALLA HTML
    for (let i = 0; i < records.length; i++) {
      //console.log(`record: ${records[i]}`);
      results.append(records[i]);
      results.append("\n");
      leidos++;
    }//for
    console.log('leidos: ' + leidos);
    console.log(results.toString());
  }

  function genReportCUBO() {
    var db = new sqlite3.Database(databaseFile);
    var myQuery = "SELECT strftime('%d/%m/%Y',date(i99.fecha_estado_modif)) as fecha, i99.Proyecto_ID as Proyecto, i99.id as Cod_GEDEON, i99.Titulo as desc FROM incidenciasProyecto i99 LEFT OUTER JOIN subdireccion s74 ON s74.id=i99.Unidad_origen LEFT OUTER JOIN servicio s68 ON s68.id=i99.Area_origen  WHERE  ((date(i99.Fecha_de_tramitacion) between date('now','start of month','-2 month') AND date('now','start of month', '-1 day'))  OR (date(i99.fecha_estado_modif) between date('now','start of month','-2 month') AND date('now','start of month', '-1 day'))) AND (  (i99.Area_destino LIKE '7201 17G L2 ISM ATH Análisis Estructurado'  OR i99.Area_destino LIKE '7201 17G L2 ISM ATH Análisis Orientado a Objecto') OR  (i99.Tipo LIKE '%Entrega%' AND i99.Area_destino LIKE 'Desarrollo Gestionado%')) ORDER BY i99.Proyecto_ID, i99.fecha_estado_modif asc";
    return new Promise((resolve,reject)=>{
      db.all(myQuery, (err, rows) => {
        if(err){
          return console.error(err.message);
        }
        i =0;
        rows.forEach(function (row, i) {
          i++;
          data.push(`${i}->${row.fecha} - ${row.Proyecto} : ${row.Cod_GEDEON} - ${row.desc}`);
        });
        resolve(data);
      });//end of db.all
      
      db.close();

    });//end of Promise
   };//end of genReportCUBO


module.exports = router;//exportamos el alias router