var linelabel = require('../index.js');
var Suite = require('benchmark').Suite;

var line = [];
for (var i = 0; i < 1000; i++) {
	line.push([Math.random()*100,Math.random()*100]);
}

new Suite()
	.add('linelabel', function() {
		linelabel(line, 0.2);
	})
	.on('cycle', function(event) {
		console.log(event.target.toString());
	})
	.on('error', function(e) {
		throw e.target.error;
	})
	.run();
