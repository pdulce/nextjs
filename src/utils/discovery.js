const jpeg = require('jpeg-js')
const fs = require('fs')
const path = require("path")
const request = require('request')
const cheerio = require('cheerio')
const fetch = require('node-fetch')
const moment = require("moment")
require('moment/locale/cs')
const tf = require('@tensorflow/tfjs')
// Load the binding (CPU computation)
require('@tensorflow/tfjs-node')

const mobilenet = require('@tensorflow-models/mobilenet')
const { randomInt } = require('crypto')

const terminos = ['saludo', 'guerra', 'valle', 'palacio', 'hispania', 'Antigua Roma', 'Mediterráneo', 'Europa', 'República', 'Pandemia', 
'filosofía', 'alquimia', 'deportes', 'escalada', 'historia del arte', 'literatura', 'geografía', 'historia', 'matemáticas', 'nuevas tecnologías']

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

const discover = async function (terms, imageRec){

  // vamos con los términos
  let ind = Math.floor( (Math.random()*new moment()))%terminos.length;
  var term = terminos[ind];
  console.log('term aleatorio: ' + term);
  let response = await fetch(`https://pixabay.com/es/photos/${term}/`);// GET
  let html = await response.text();
  let $ = cheerio.load(html);

  let divcontent = $('body').find('div', '#wrapper').find('div', '#content');
  //console.log(divcontent.text());
  let divcontent__= $(divcontent).find('div', 'class="media_list"').find('div', 'style="background: #f6f5fa"');
  //console.log(divcontent__.text());
  let divsInternos = $(divcontent__).find('div:first-child').
                                  find('div', 'class="flex_grid credits search_results"').
                                  find('div', 'class="item"');
  console.log(divsInternos.text());

  //console.log(divsInternos.attribs);
  /*let imagenes = [];
  for (let imagediv of divsInternos){
    let imagen = $(imagediv).find('meta', 'itemprop="contentUrl"');
    //imagenes.push(imagen.attr('src'));
    console.log('imagen: '+ imagen);
  }
  console.log(imagenes);*/

  //let _div = $(div_).find('div').find('div').toArray()[1];//este div es el 
  //let __divs = $(_div).find('div');//estos ya serían los elementos que buscamos, con su img dentro
 
 /*

  for (let lastDiv of __divs){
    let imagen = $(lastDiv).find('a').find('img');
    imagenes.push(imagen.attr('src'));
    console.log('imagen: '+ imagen);
  }
  console.log("imagenes");
  */

  const model = await mobilenet.load();
  console.log('model charged!');
  
  var jpegData = fs.readFileSync(imageRec);
  var imgRawData = jpeg.decode(jpegData, true);//a unixArray
  //console.log(imgRawData);

  var input_ = imageToInput(imgRawData, 3);
  var predictions = await model.classify(input_);

  console.log('prediction done!!');

  return predictions;
} 


module.exports = { discover}