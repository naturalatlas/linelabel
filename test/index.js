var linelabel = require('../index.js');
var tap = require('tap');

function rad(deg) {
	return deg/360*Math.PI*2;
}

/* array accessor */

tap.test('array accessor: simple straight line', function(t) {
	t.plan(1);
	var result = linelabel([[0,0],[1,1],[30,30]], rad(1));
	t.deepEqual(result, [ {
		length: 42.426406871192846,
		beginIndex: 0,
		beginDistance: 0,
		endIndex: 3,
		endDistance: 42.426406871192846,
		angles: [ null, 0, null ] } ]);
});

tap.test('array accessor: simple curved line', function(t) {
	t.plan(1);
	var x = 0, y = 0, a = 0;
	var pts = [[x,y]];
	for (var i = 0, n = 10; i < n; i++) {
		a += rad(5);
		x += Math.cos(a) * 5;
		y += Math.sin(a) * 5;
		pts.push([x,y]);
	}
	var result = linelabel(pts, rad(6));
	t.deepEqual(result, [ {
		length: 50,
		beginIndex: 0,
		beginDistance: 0,
		endIndex: 11,
		endDistance: 50,
		angles:
		 [ null,
		   0.08726646259971506,
		   0.08726646259971506,
		   0.08726646259971506,
		   0.08726646259971761,
		   0.08726646259971761,
		   0.08726646259971506,
		   0.08726646259971506,
		   0.08726646259971506,
		   0.08726646259971761,
		   null ] } ]);
});

tap.test('array accessor: invalid curved line', function(t) {
	t.plan(1);
	var x = 0, y = 0, a = 0;
	var pts = [[x,y]];
	for (var i = 0, n = 3; i < n; i++) {
		a += rad(5);
		x += Math.cos(a) * 5;
		y += Math.sin(a) * 5;
		pts.push([x,y]);
	}
	var result = linelabel(pts, rad(2));
	t.deepEqual(result, [{
		length: 5,
		beginDistance: 0,
		beginIndex: 0,
		endIndex: 2,
		endDistance: 5,
		angles: [ null, 0.08726646259971506 ]
	},{
		length: 5,
		beginDistance: 5,
		beginIndex: 1,
		endIndex: 3,
		endDistance: 10,
		angles: [ 0.08726646259971506, 0.08726646259971506 ]
	},{
		length: 4.999999999999999,
		beginIndex: 2,
		beginDistance: 10,
		endIndex: 4,
		endDistance: 15,
		angles: [ 0.08726646259971506, null ]
	}]);
});


/* property accessor */
linelabel = require('../xy.js');

tap.test('property accessor: simple straight line', function(t) {
	t.plan(1);
	var result = linelabel([{x: 0, y: 0},{x: 1, y: 1},{x: 30, y: 30}], rad(1));
	t.deepEqual(result, [ {
		length: 42.426406871192846,
		beginIndex: 0,
		beginDistance: 0,
		endIndex: 3,
		endDistance: 42.426406871192846,
		angles: [ null, 0, null ] } ]);
});

tap.test('property accessor: simple curved line', function(t) {
	t.plan(1);
	var x = 0, y = 0, a = 0;
	var pts = [{x: x, y: y}];
	for (var i = 0, n = 10; i < n; i++) {
		a += rad(5);
		x += Math.cos(a) * 5;
		y += Math.sin(a) * 5;
		pts.push({x: x, y: y});
	}
	var result = linelabel(pts, rad(6));
	t.deepEqual(result, [ {
		length: 50,
		beginIndex: 0,
		beginDistance: 0,
		endIndex: 11,
		endDistance: 50,
		angles:
		 [ null,
		   0.08726646259971506,
		   0.08726646259971506,
		   0.08726646259971506,
		   0.08726646259971761,
		   0.08726646259971761,
		   0.08726646259971506,
		   0.08726646259971506,
		   0.08726646259971506,
		   0.08726646259971761,
		   null ] } ]);
});

tap.test('property accessor: invalid curved line', function(t) {
	t.plan(1);
	var x = 0, y = 0, a = 0;
	var pts = [{x: x, y: y}];
	for (var i = 0, n = 3; i < n; i++) {
		a += rad(5);
		x += Math.cos(a) * 5;
		y += Math.sin(a) * 5;
		pts.push({x: x, y: y});
	}
	var result = linelabel(pts, rad(2));
	t.deepEqual(result, [{
		length: 5,
		beginDistance: 0,
		beginIndex: 0,
		endIndex: 2,
		endDistance: 5,
		angles: [ null, 0.08726646259971506 ]
	},{
		length: 5,
		beginDistance: 5,
		beginIndex: 1,
		endIndex: 3,
		endDistance: 10,
		angles: [ 0.08726646259971506, 0.08726646259971506 ]
	},{
		length: 4.999999999999999,
		beginIndex: 2,
		beginDistance: 10,
		endIndex: 4,
		endDistance: 15,
		angles: [ 0.08726646259971506, null ]
	}]);
});
