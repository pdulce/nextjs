
const sqlite3 = require("sqlite3").verbose();
const databaseFile = "C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\data\\sqlite\\factUTEDBLite.db";

var genReportCUBO = function (arr) {
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

var genCertifMensualAT = function (arr) {
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

var genReportPPTX = function (fechaDesde, arr) {
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

var genReportCaducadas = function (dias, arr) {
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

};//end of genReportCUBO

module.exports = {genReportCUBO, genCertifMensualAT, genReportPPTX, genReportCaducadas};