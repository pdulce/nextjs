const jpeg = require('jpeg-js')
const fs = require('fs')
const path = require("path")
const cheerio = require('cheerio')
const fetch = require('node-fetch')
const moment = require("moment")
const Stream = require('stream').Transform
require('moment/locale/cs')
const tf = require('@tensorflow/tfjs')
// Load the binding (CPU computation)
require('@tensorflow/tfjs-node')

const mobilenet = require('@tensorflow-models/mobilenet')

/** This function will return a Uint8Array with four channel values (RGBA) for each pixel (width * height). 
     * The MobileNet model only uses the three colour channels (RGB) for classification, ignoring the alpha channel. 
     * This code converts the four channel array into the correct three channel version.*/
const imageByteArray = (image, numChannels) => {
    const pixels = image.data
    const numPixels = image.width * image.height;
    const values = new Int32Array(numPixels * numChannels);
  
    for (let i = 0; i < numPixels; i++) {
      for (let channel = 0; channel < numChannels; ++channel) {
        values[i * numChannels + channel] = pixels[i * 4 + channel];//la 41 coordenada la descartamos siempre
      }
    }
    return values;
  }

const imageToInput = (image, numChannels) => {
    const values = imageByteArray(image, numChannels);
    const outShape = [image.height, image.width, numChannels];
    const input = tf.tensor3d(values, outShape, 'int32');
  
    return input;
  }

const discover = async function(termBusqueda, imageRec){
  
  let response = await fetch(`https://www.shutterstock.com/es/search/${termBusqueda}?kw=bancos+de+fotos+libres&image_type=photo`, 
    {
      method: 'GET',
      credentials: 'include'
    }
  );

  let html = await response.text();
  var pathOfHtmlReceived = path.join(__dirname, `../views/received.html`);
  if (fs.existsSync(pathOfHtmlReceived)) {
    fs.unlink(pathOfHtmlReceived, function (err){
      if (err){
        console.log(`error borrando fichero received.html`);
      }/*else{
        console.log('file deleted!');
      }*/
    });
  }

  fs.writeFileSync(pathOfHtmlReceived, html);
  console.log('html saved at disk');

  let $ = cheerio.load(html);

  //funciona: console.log($('div', '#search-results-mosaic-grid'))
  //funciona: console.log($('div[class="z_h_b900b"]'))
  // funciona: console.log($('img[class="z_h_9d80b z_h_2f2f0"]'));
  var imgAlAzar = '';
  var aleatorio = Math.floor((Math.random()*new moment()))%20;
  $('img[class="z_h_9d80b z_h_2f2f0"]').each((i, el) => {
    if (i == aleatorio){
      imgAlAzar = $(el). attr('src');
      //console.log(aleatorio);
      console.log(`imagen al azar ${imgAlAzar}`);
    }
  });

  var pathOfImage = path.join(__dirname, `../public/img/${imageRec}`);
  // borro la imagen que pudiera haberse cargado previamente
  if (fs.existsSync(pathOfImage)) {
    fs.unlink(pathOfImage, function (err){
      if (err){
        console.log(`error borrando fichero${pathOfImage}`);
      }/*else{
        console.log('previous image deleted!');
      }*/
    });
  }

  //busco una imagen dentro de ese html recibido
  https.request(imgAlAzar, function(response) {                                        
    var data = new Stream();                                                    
    response.on('data', function(chunk) {                                       
      data.push(chunk);                                                         
    });                                                                         
    response.on('end', function() {                                             
      fs.writeFileSync(pathOfImage, data.read());                               
    });                                                                      
  }).end();

  const model = await mobilenet.load();
  console.log('mobilenet model charged!');
  
  var jpegData = fs.readFileSync(pathOfImage);
  var imgRawData = jpeg.decode(jpegData, true);

  var input_ = imageToInput(imgRawData, 3);
  var predictions = await model.classify(input_);

  console.log('prediction done!!');

  return predictions;
}



module.exports = { discover}