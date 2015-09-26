var fs = require('fs');
var fn = require('../template.js');
var prefix = '/* (DONT EDIT THIS FILE) see template.js instead */\n\n';

var source_arr = prefix + '/* array accessor style (default) */\nmodule.exports = ' + fn.toString()
	.replace(/\[X\]/g, '[0]')
	.replace(/\[Y\]/g, '[1]');

fs.writeFileSync('./index.js', source_arr, 'utf8');

var source_xy = prefix + '/* x,y property accessor style */\nmodule.exports = ' + fn.toString()
	.replace(/\[X\]/g, '.x')
	.replace(/\[Y\]/g, '.y');

fs.writeFileSync('./xy.js', source_xy, 'utf8');

