const fs = require('fs')
const path = require("path")
const StringBuffer = require("stringbuffer")
const moment = require("moment")
require('moment/locale/cs')
const sqlite3 = require("sqlite3").verbose()

const databaseFile = path.join(__dirname, "../../resources/factUTEDBLite.db");
//"C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\data\\sqlite\\factUTEDBLite.db";
const monthList = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ];

var queryReportCUBO = function (arr) {
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

}//end of genReportCUBO

var genReportCUBO = function(records){
  var mesInicial = moment().subtract(2, 'month').format("MM");
  var mesFinal = moment().subtract(1, 'month').format("MM"); //otros formatos de salida "YYYY MM DD
  var bloques = new StringBuffer();
  var proyectoAux = '', mesAux = '';
  var numPeticionesMes1 = 0, numPeticionesMes2 = 0;

  bloques.append("Número total de actividades realizadas: " + records.length);
  bloques.append("\n");

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
  
  //letra del informe: Trebuchet MS 9 (negrita para proyecto y mes)
  return bloques.toString();

}

var queryCertifMensualAT = function (arr) {
  var db = new sqlite3.Database(databaseFile);
  var myQuery = "SELECT i99.Proyecto_ID as Proyecto, i99.id as Cod_GEDEON, i99.Titulo as desc, date(i99.Fecha_de_tramitacion) as fechatram FROM incidenciasProyecto i99 LEFT OUTER JOIN subdireccion s74 ON s74.id=i99.Unidad_origen LEFT OUTER JOIN servicio s68 ON s68.id=i99.Area_origen  WHERE ("+
  "(date(i99.Fecha_de_tramitacion) between date('now','start of month','-1 month') AND date('now')) "+
  "OR (Estado LIKE '%curso%')"+
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
        arr.push(`${row.Proyecto} | ${row.Cod_GEDEON} | ${row.desc} | [${row.fechatram}]`);
      });
      resolve(arr);
    });//end of db.all
    
    db.close();

  });//end of Promise

}//end of genReportCUBO

var genCertifMensualAT = function (records, mesCertificado){
  var bloques = new StringBuffer();
  var proyectoAux = '';
  
  bloques.append("Número total de actividades realizadas en " + monthList[parseInt(mesCertificado)-1] + ": " + records.length);
  bloques.append("\n");

  for (let i = 0; i < records.length; i++) {
    var splitter_ = records[i].split("|");
    var proyecto_ = splitter_[0];
    var codGedeon_ = splitter_[1];
    var descGedeon_ = splitter_[2];
    var fechatram = splitter_[3];
    if (proyectoAux == '' || proyecto_ != proyectoAux){
      numPeticionesMes = 0;
      proyectoAux = proyecto_;
                 
      bloques.append("\n\n");
      bloques.append(proyectoAux);
      bloques.append("\n\n");
    }
    
    //llenamos el bloque actual
    bloques.append("-  ").append(fechatram).append(codGedeon_).append(" - ").append(descGedeon_);
    bloques.append("\n"); 
    numPeticionesMes++;
  }//for 

  return bloques.toString();
}

var queryReportCaducadas = function (dias, arr) {
  var db = new sqlite3.Database(databaseFile);
  var myQuery = `SELECT i99.Proyecto_ID as Proyecto, s74.nombre as area_origen, s68.nombre as centro_origen, i99.id as Cod_GEDEON, i99.Titulo as desc, i99.Des_fecha_prevista_fin as fecFechaFin, i99.Tipo as tipo, i99.Area_destino as destino, i99.Estado as situacion, i99.Fecha_de_necesidad as fecNecesidad FROM incidenciasProyecto i99 LEFT OUTER JOIN subdireccion s74 ON s74.id=i99.Unidad_origen LEFT OUTER JOIN servicio s68 ON s68.id=i99.Area_origen  WHERE date(i99.Des_fecha_prevista_fin) between date('now') AND date('now', '+${dias} day') AND (i99.Des_fecha_real_fin is null OR date(i99.Des_fecha_real_fin) < date('now')) AND i99.Estado <> 'Petición de trabajo finalizado' ORDER BY i99.Proyecto_ID, i99.Area_destino asc`;
  
  return new Promise((resolve,reject)=>{
    db.all(myQuery, (err, rows) => {
      if(err){
        return console.error(err.message);
      }
      rows.forEach(function (row, index) {
        //${index}->
        arr.push(`${row.Proyecto} | ${row.area_origen} | ${row.centro_origen} | ${row.Cod_GEDEON} | ${row.fecFechaFin} | ${row.tipo} | ${row.destino} | ${row.situacion} | ${row.fecNecesidad} | ${row.desc}`);
      });
      resolve(arr);
    });//end of db.all
    
    db.close();

  });//end of Promise



}//end of genReportCUBO

var genReportCaducadas = function (records, diasfin){
  var bloques = new StringBuffer();
  var proyectoAux = '', areaAux = '', fechaFinAux = '';
  
  bloques.append(`Número total de actividades que van a finalizar en los próximos ${diasfin} días => ${records.length}`);
  bloques.append("\n");
 
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

  return bloques.toString();  
}

var queryReportPPTX = function (fechaDesde, arr) {
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

}//end of genReportCUBO

var genReportPPTX = function (records){
  var bloques = new StringBuffer();
  var proyectoAux = '', areaAux = '', situacionAux = '';
 
  bloques.append("Número total de actividades realizadas: " + records.length);
  bloques.append("\n");

  for (let i = 0; i < records.length; i++) {
    var splitter_ = records[i].split("|");
    //${row.Proyecto} | ${row.area} | ${row.situacion} | ${row.Cod_GEDEON} | ${row.desc}
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
      situacionAux = situacion_;
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

    bloques.append("\t\t\t- ").append(codGedeon_).append(" - ").append(descGedeon_).append("\n");
    
  }//for

  return bloques.toString();
}

var generarGraficoJSON = function (){
  /*var configuration = {
    type: 'bar',
    data: {
        labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
        datasets: [{
                label: 'Scored',
                data: [2478,5267,734,784,433],
                        backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
    }]},
    options: {
        scales: {
            yAxes: [{
                ticks: {
                precision:0,
                beginAtZero: true
                }
            }]
        }
    }
  }*/
 
  var configuration = {
    type: 'pie', 
    data: {
        labels: ["ANALISIS (93.60%)", "PRUEBAS (6.40%)"],//, "SOPORTE (20.68%)"],
        datasets: [{
                label: 'Horas dedicación', //'Scored',
                data: //[(123.5+104)+(57+33.75),(222.75+192.65),(99+23)+(56.25+54.15)], /**FOM2 */
                      [26+ 3.25, 2], /**FRMA */
                      //[(150+235)+0, 58,(87.5+28)], /**SANI */
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
    }]},
    options: {
      responsive: true
    }
  }

  return configuration
}


var genJSONReportPPTX = function (records){
  var mapa = new Map();//keys: 'categories', 'series');
  mapa.series = new Array(), mapa.categories= new Array();

  var bloques = new StringBuffer();
  var proyectoAux = '', areaAux = '', situacionAux = '';
 
  /** generar esta estructura de salida:
   * 
   * series: [
      {
        name: 'Peticiones en curso - Area AT',
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6]
    }, {
        name: 'Peticiones en curso - Area DG',
        data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0]

    },
    {
        name: 'Peticiones sin comenzan - Area DG',
        data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0]

    },
      name: 'Peticiones sin comenzan - Area AT',
        data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0]

    }]
   */

  for (let i = 0; i < records.length; i++) {
    var splitter_ = records[i].split("|");
    //${row.Proyecto} | ${row.area} | ${row.situacion} | ${row.Cod_GEDEON} | ${row.desc}
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
      mapa.categories.push(`${proyectoAux}`);

      bloques.append("\n\n");
      bloques.append("\t" + areaAux);
      bloques.append("\n\n");
      bloques.append("\t\t" + situacionAux);
      bloques.append("\n\n");
    }
    
    //llenamos el bloque actual
    if (area_ != areaAux){
      areaAux = area_;
      situacionAux = situacion_;
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

    bloques.append("\t\t\t- ").append(codGedeon_).append(" - ").append(descGedeon_).append("\n");
    
  }//for
 
  console.log(mapa.categories);
  return mapa;
}

module.exports = {generarGraficoJSON, queryReportCUBO, genReportCUBO, queryCertifMensualAT, genCertifMensualAT, queryReportPPTX, genReportPPTX, genJSONReportPPTX, queryReportCaducadas, genReportCaducadas}