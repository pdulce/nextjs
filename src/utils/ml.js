const jsregression = require("js-regression");

const makeModel = async function () {
  // === training data generated from y = 2.0 + 5.0 * x + 2.0 * x^2 === //
  var data = [];
  for (var x1 = 1.0; x1 < 10.0; x1 += 1.0) {
    for (var x2 = 1.0; x2 < 10.0; x2 += 1.0) {
        var y = 1.0 + 2.0*x1  + 3.0*x2;
        data.push([x1, x2, y]); // Note that the last column should be y the output
    }
  }

  console.log(data);

  // === Create the linear regression === //
  var regression = new jsregression.LinearRegression({
    alpha: 0.001, //
    iterations: 300,
    lambda: 0.0,
  });
  // can also use default configuration: var regression = new jsregression.LinearRegression();

  // === Train the linear regression === //
  var model = regression.fit(data);

  // === Print the trained model === //
  console.log(model);

  // === Testing the trained linear regression === //
  for (var x1 = 1.0; x1 < 10.0; x1 += 1.0) {
    for (var x2 = 1.0; x2 < 10.0; x2 += 1.0) {
        var actual_y = 1.0 + 2.0*x1  + 3.0*x2;
        var predicted_y = regression.transform([x1, x2]);
        console.log("actual: " + actual_y + " predicted: " + predicted_y);
        
    }
  }

  return 'done';
};

module.exports = { makeModel };

// modelo inferido --> y= 0.46 + 2.11*x1 + 2.98*x2
// real-->    y = 1.0 + 2.0*x1  + 3.0*x2;