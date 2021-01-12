const jpeg = require('jpeg-js')
const fs = require('fs')
const path = require("path")
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

    //console.log("values converted to 3 channels:");
    //console.log(values);

    return values;
  }

const imageToInput = (image, numChannels) => {
    const values = imageByteArray(image, numChannels);
    const outShape = [image.height, image.width, numChannels];
    const input = tf.tensor3d(values, outShape, 'int32');
  
    return input;
  }

const discover = async function (terms, imageRec){

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