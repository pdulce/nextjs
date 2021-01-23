const excelToJson = require("convert-excel-to-json");

var result = excelToJson({
    sourceFile: "./resources/sample-gedeones.xlsx",
    //header: put the number of rows that will be skipped and will not be present at our result object. Counting from top to bottom
    header: {
      rows: 1,
    },
    //solo volcamos al objeto result las columnas deseadas
    columnToKey: {
      A: "GEDEON-id",
      B: "{{B1}}",
      C: "{{C1}}",
    }, //,
    //sheets: ['sheet1', 'sheet2', ...]
  });
  
  //console.log('...el poder de lo asincrono, cargamos el Excel en un objeto JSON...');
  
  console.log(result);