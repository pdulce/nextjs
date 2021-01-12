const tf = require('@tensorflow/tfjs')
// Load the binding (CPU computation)
require('@tensorflow/tfjs-node')

const mobilenet = require('@tensorflow-models/mobilenet')


var discover = async function (terms){
    const model = await mobilenet.load();
    console.log('model charged!');
    
    //model.
} 


module.exports = { discover}