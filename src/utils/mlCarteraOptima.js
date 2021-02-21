const jsregression = require("js-regression");
/**
 **** Contenido del fichero .csv:  
 * CARTERAS DE PETICIONES DE VERSIONES CON EJECUCIÓN VIABLE (IMPLEMENTACIÓN + PRUEBAS APROX. 1 MES) 
 * CON MÍNIMO NÚMERO DE ITERACIONES DE CICLOS DE PRUEBAS DE VALIDACIÓN FUNCIONAL EN AT ANTES DE SU DESPLIEGUE EN PRODUCCIÓN
 */

const makeModel = async function () {
  
  var data = [];
  // ASUMIMOS que el periodo de desarrollo no debería superar un mes, con un máximo total de uts estimadas de la cartera de unas 1.500 uts.
  // Deseamos disponer de un modelo que maximime el número de peticiones de una cartera de peticiones de una entrega/versión planificada, de forma
  // que se minimice el riesgo de no lograr la consecución de los trabajos derivados de la misma en tiempo y/o calidad.
  // Esos trabajos constituyen el diseño, implementación y pruebas (automatizadas o no), que garanticen un mínimo número de iteraciones 
  // en las validaciones que de esa versión se realicen posteriormente en el área de AT.
  // Tomaremos en consideraicón el tipo de proyecto, nº de peticiones de cada tipología de peticiones,...
  
  // Modelo propuesto con 8 dimensiones:
  // x1: tipo de proyecto (0:con mantenimiento en Producción,1:Desarrollo puro)
  // x2/PE: núm. peticiones de Pequeños Evolutivos
  // x3/ME_B: núm. peticiones de Mejoras Desarrollo [80-250] uts
  // x4/ME_M: núm. peticiones de Mejoras Desarrollo [250-500] uts
  // x5/ME_A: núm. peticiones de Mejoras Desarrollo [501-1000] uts
  // x6/ND_M: núm. peticiones de Nuevos Desarrollos [500-1000] uts
  // x7/ND_A: núm. peticiones de Nuevos Desarrollos [1001-4000] uts
  // y: % de éxito en lograr cubrir la entrega en forma [0..1] con esa  cartera --> hay que maximizar este %. Si es > 80% daremos por buena la cartera
  
  /** cartera de proyectos de mantenimiento en producción */
  data.push([0/*x1*/, 2/*PE*/, 2/*ME_B*/, 1/*ME_M*/, 0/*ME_A*/, 1/*ND_M*/, 0/*ND_A*/, /*y: variable estimada*/0.9]);
  data.push([0/*x1*/, 0/*PE*/, 1/*ME_B*/, 2/*ME_M*/, 0/*ME_A*/, 0/*ND_M*/, 0/*ND_A*/, 0.99]);
  data.push([0/*x1*/, 2/*PE*/, 2/*ME_B*/, 2/*ME_M*/, 0/*ME_A*/, 1/*ND_M*/, 0/*ND_A*/, 0.85]);
  data.push([0/*x1*/, 0/*PE*/, 2/*ME_B*/, 1/*ME_M*/, 2/*ME_A*/, 1/*ND_M*/, 0/*ND_A*/, 0.8]);
  data.push([0/*x1*/, 2/*PE*/, 2/*ME_B*/, 1/*ME_M*/, 0/*ME_A*/, 1/*ND_M*/, 1/*ND_A*/, 0.5]);
  data.push([0/*x1*/, 3/*PE*/, 1/*ME_B*/, 1/*ME_M*/, 1/*ME_A*/, 1/*ND_M*/, 0/*ND_A*/, 0.83]);
  data.push([0/*x1*/, 4/*PE*/, 1/*ME_B*/, 0/*ME_M*/, 0/*ME_A*/, 1/*ND_M*/, 0/*ND_A*/, 0.81]);
  data.push([0/*x1*/, 0/*PE*/, 2/*ME_B*/, 2/*ME_M*/, 0/*ME_A*/, 0/*ND_M*/, 0/*ND_A*/, 0.83]);
  data.push([0/*x1*/, 0/*PE*/, 2/*ME_B*/, 1/*ME_M*/, 1/*ME_A*/, 1/*ND_M*/, 0/*ND_A*/, 0.68]);
  data.push([0/*x1*/, 0/*PE*/, 2/*ME_B*/, 1/*ME_M*/, 0/*ME_A*/, 1/*ND_M*/, 5/*ND_A*/, 0.01]);
  data.push([0/*x1*/, 0/*PE*/, 2/*ME_B*/, 1/*ME_M*/, 0/*ME_A*/, 1/*ND_M*/, 4/*ND_A*/, 0.02]);
  data.push([0/*x1*/, 0/*PE*/, 2/*ME_B*/, 1/*ME_M*/, 0/*ME_A*/, 1/*ND_M*/, 3/*ND_A*/, 0.15]);
  data.push([0/*x1*/, 0/*PE*/, 2/*ME_B*/, 1/*ME_M*/, 0/*ME_A*/, 1/*ND_M*/, 2/*ND_A*/, 0.25]);
  data.push([0/*x1*/, 0/*PE*/, 2/*ME_B*/, 1/*ME_M*/, 0/*ME_A*/, 1/*ND_M*/, 1/*ND_A*/, 0.45]); 
  data.push([0/*x1*/, 0/*PE*/, 2/*ME_B*/, 1/*ME_M*/, 1/*ME_A*/, 1/*ND_M*/, 0/*ND_A*/, 0.68]);
  data.push([0/*x1*/, 0/*PE*/, 0/*ME_B*/, 1/*ME_M*/, 2/*ME_A*/, 0/*ND_M*/, 0/*ND_A*/, 0.82]);
  data.push([0/*x1*/, 1/*PE*/, 2/*ME_B*/, 3/*ME_M*/, 1/*ME_A*/, 0/*ND_M*/, 0/*ND_A*/, 0.72]);
  data.push([0/*x1*/, 2/*PE*/, 0/*ME_B*/, 3/*ME_M*/, 0/*ME_A*/, 0/*ND_M*/, 0/*ND_A*/, 0.9]);
  data.push([0/*x1*/, 3/*PE*/, 2/*ME_B*/, 0/*ME_M*/, 0/*ME_A*/, 0/*ND_M*/, 0/*ND_A*/, 0.9]);
  data.push([0/*x1*/, 4/*PE*/, 1/*ME_B*/, 1/*ME_M*/, 0/*ME_A*/, 1/*ND_M*/, 0/*ND_A*/, 0.75]); 

  /** cartera de proyectos de puro desarrollo--> suelen tener equipos dedicados en DG con menor rotación */
  data.push([1/*x1*/, 1/*PE*/, 2/*ME_B*/, 1/*ME_M*/, 0/*ME_A*/, 1/*ND_M*/, 0/*ND_A*/, 0.9]);
  data.push([1/*x1*/, 0/*PE*/, 1/*ME_B*/, 2/*ME_M*/, 0/*ME_A*/, 0/*ND_M*/, 0/*ND_A*/, 0.99]);
  data.push([1/*x1*/, 1/*PE*/, 2/*ME_B*/, 2/*ME_M*/, 0/*ME_A*/, 1/*ND_M*/, 0/*ND_A*/, 0.88]);
  data.push([1/*x1*/, 0/*PE*/, 2/*ME_B*/, 1/*ME_M*/, 2/*ME_A*/, 1/*ND_M*/, 0/*ND_A*/, 0.85]);
  data.push([1/*x1*/, 2/*PE*/, 2/*ME_B*/, 1/*ME_M*/, 0/*ME_A*/, 1/*ND_M*/, 1/*ND_A*/, 0.80]);
  data.push([1/*x1*/, 1/*PE*/, 1/*ME_B*/, 1/*ME_M*/, 1/*ME_A*/, 1/*ND_M*/, 0/*ND_A*/, 0.83]);
  data.push([1/*x1*/, 1/*PE*/, 1/*ME_B*/, 2/*ME_M*/, 1/*ME_A*/, 1/*ND_M*/, 0/*ND_A*/, 0.87]);
  data.push([1/*x1*/, 0/*PE*/, 2/*ME_B*/, 2/*ME_M*/, 0/*ME_A*/, 0/*ND_M*/, 0/*ND_A*/, 0.89]);
  data.push([1/*x1*/, 0/*PE*/, 2/*ME_B*/, 1/*ME_M*/, 1/*ME_A*/, 1/*ND_M*/, 0/*ND_A*/, 0.77]);
  data.push([1/*x1*/, 0/*PE*/, 2/*ME_B*/, 1/*ME_M*/, 0/*ME_A*/, 1/*ND_M*/, 5/*ND_A*/, 0.2]);
  data.push([1/*x1*/, 0/*PE*/, 2/*ME_B*/, 1/*ME_M*/, 0/*ME_A*/, 1/*ND_M*/, 4/*ND_A*/, 0.25]);
  data.push([1/*x1*/, 0/*PE*/, 2/*ME_B*/, 1/*ME_M*/, 0/*ME_A*/, 1/*ND_M*/, 3/*ND_A*/, 0.35]);
  data.push([1/*x1*/, 0/*PE*/, 2/*ME_B*/, 1/*ME_M*/, 0/*ME_A*/, 1/*ND_M*/, 2/*ND_A*/, 0.55]);
  data.push([1/*x1*/, 0/*PE*/, 2/*ME_B*/, 1/*ME_M*/, 0/*ME_A*/, 1/*ND_M*/, 1/*ND_A*/, 0.85]); 
  data.push([1/*x1*/, 0/*PE*/, 0/*ME_B*/, 1/*ME_M*/, 2/*ME_A*/, 0/*ND_M*/, 0/*ND_A*/, 0.94]);
  data.push([1/*x1*/, 1/*PE*/, 2/*ME_B*/, 2/*ME_M*/, 1/*ME_A*/, 0/*ND_M*/, 0/*ND_A*/, 0.65]);
  data.push([1/*x1*/, 0/*PE*/, 3/*ME_B*/, 1/*ME_M*/, 0/*ME_A*/, 0/*ND_M*/, 0/*ND_A*/, 0.9]);
  data.push([1/*x1*/, 0/*PE*/, 4/*ME_B*/, 0/*ME_M*/, 1/*ME_A*/, 0/*ND_M*/, 0/*ND_A*/, 0.8]);
  data.push([1/*x1*/, 0/*PE*/, 1/*ME_B*/, 1/*ME_M*/, 0/*ME_A*/, 1/*ND_M*/, 1/*ND_A*/, 0.76]); 

  //console.log(data);

  // === Create the linear regression === //
  var regression = new jsregression.LinearRegression({
    alpha: 0.001, //
    iterations: 3000,
    lambda: 0.0,
  });
  
  // === Train the linear regression === //
  var model = regression.fit(data);

  // === Print the trained model === //
  console.log(model);

  var actual_y = 0.8;
  var predicted_y = regression.transform([0/*x1*/, 2/*PE*/, 2/*ME_B*/, 1/*ME_M*/, 0/*ME_A*/, 1/*ND_M*/, 0/*ND_A*/]);
  console.log("1. actual: " + actual_y + " predicted: " + round(predicted_y, 2));

  actual_y = 0.35;
  predicted_y = regression.transform([1/*x1*/, 0/*PE*/, 2/*ME_B*/, 1/*ME_M*/, 0/*ME_A*/, 1/*ND_M*/, 3/*ND_A*/]);
  console.log("2. actual: " + actual_y + " predicted: " + round(predicted_y, 2));

  return 'done';
};

function round(num, decimales = 2) {
  var signo = (num >= 0 ? 1 : -1);
  num = num * signo;
  if (decimales === 0) //con 0 decimales
      return signo * Math.round(num);
  // round(x * 10 ^ decimales)
  num = num.toString().split('e');
  num = Math.round(+(num[0] + 'e' + (num[1] ? (+num[1] + decimales) : decimales)));
  // x * 10 ^ (-decimales)
  num = num.toString().split('e');
  return signo * (num[0] + 'e' + (num[1] ? (+num[1] - decimales) : -decimales));
}


module.exports = { makeModel };