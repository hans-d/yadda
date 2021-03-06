var Yadda = require('yadda');
Yadda.plugins.mocha();

feature('./features/bottles.feature', function(feature) {

    var library = require('./bottles-library');
    var yadda = new Yadda.Yadda(library);

    scenarios(feature.scenarios, function(scenario, done) {
        yadda.yadda(scenario.steps, done);
    });
});