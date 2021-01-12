const jpeg = require('jpeg-js')
const fs = require('fs')
const path = require("path")
const tf = require('@tensorflow/tfjs')
// Load the binding (CPU computation)
require('@tensorflow/tfjs-node')

const mobilenet = require('@tensorflow-models/mobilenet')


var discover = async function (terms){
    const model = await mobilenet.load();
    console.log('model charged!');
    
    var jpegData = fs.readFileSync(path.join(__dirname, "../public/img/nature.jpeg"));
    var pixels = jpeg.decode(jpegData, true);//a unixArray
    console.log(pixels);

    //const predictions = await model.classify(img);
    console.log('prediction done!!');

} 


module.exports = { discover}