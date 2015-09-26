var linelabel = require('../index.js');
var tap = require('tap');

function rad(deg) {
	return deg/360*Math.PI*2;
}


function assertFloat(expected, actual) {
	if (typeof actual !== typeof expected || Math.abs(expected - actual) > 0.0001) {
		throw new Error('Expected ' + expected + ', got ' + actual);
	}
}
function assertResult(actual, expected) {
	if (expected.length !== actual.length) {
		throw new Error('Segment count differs');
	}
	expected.forEach(function(expectedSegment, i) {
		var actualSegment = actual[i];
		if (actualSegment.angles.length !== expectedSegment.angles.length) {
			throw new Error('Different number of angles');
		}
		expectedSegment.angles.forEach(function(expectedAngle, i) {
			var actualAngle = actualSegment.angles[i];
			var invalid = false;
			if (typeof expectedAngle !== typeof actualAngle) {
				invalid = true;
			} else if (typeof expectedAngle !== 'number') {
				invalid = expectedAngle !== actualAngle;
			} else {
				assertFloat(expectedAngle, actualAngle);
			}
			if (invalid) {
				throw new Error('Incorrect angle at index ' + i + ' (got "' + String(actualAngle) + '", expected ' + String(expectedAngle) + ')');
			}
		});

		assertFloat(expectedSegment.length, actualSegment.length);
		assertFloat(expectedSegment.startDistance, actualSegment.startDistance);
		assertFloat(expectedSegment.endDistance, actualSegment.endDistance);
		if (expectedSegment.beginIndex !== actualSegment.beginIndex) throw new Error('Invalid "beginIndex"');
		if (expectedSegment.endIndex !== actualSegment.endIndex) throw new Error('Invalid "beginIndex"');
	});
}

tap.Test.prototype.addAssert('segments', 2, function(actual, expected, message, e) {
	message = message || 'should be correct';
	e.wanted = expected;
	e.actual = actual;
	try { assertResult(actual, expected); }
	catch(err) { return this.fail(err.message || message, e); }
	return this.pass(message, e);
});

/* array accessor */

tap.test('array accessor: two point line', function(t) {
	var result = linelabel([[0,0],[0,1]], rad(1));
	t.segments(result, [ {
		length: 1,
		beginIndex: 0,
		beginDistance: 0,
		endIndex: 2,
		endDistance: 1,
		angles: [ null, null ] } ]);
	t.end();
});

tap.test('array accessor: simple straight line', function(t) {
	var result = linelabel([[0,0],[1,1],[30,30]], rad(1));
	t.segments(result, [ {
		length: 42.426406871192846,
		beginIndex: 0,
		beginDistance: 0,
		endIndex: 3,
		endDistance: 42.426406871192846,
		angles: [ null, 0, null ] } ]);
	t.end();
});

tap.test('array accessor: simple curved line', function(t) {
	var x = 0, y = 0, a = 0;
	var pts = [[x,y]];
	for (var i = 0, n = 10; i < n; i++) {
		a += rad(5);
		x += Math.cos(a) * 5;
		y += Math.sin(a) * 5;
		pts.push([x,y]);
	}
	var result = linelabel(pts, rad(6));
	t.segments(result, [ {
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
	t.end();
});

tap.test('array accessor: invalid curved line', function(t) {
	var x = 0, y = 0, a = 0;
	var pts = [[x,y]];
	for (var i = 0, n = 3; i < n; i++) {
		a += rad(5);
		x += Math.cos(a) * 5;
		y += Math.sin(a) * 5;
		pts.push([x,y]);
	}
	var result = linelabel(pts, rad(2));
	t.segments(result, [{
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
	t.end();
});


/* property accessor */
linelabel = require('../xy.js');

tap.test('property accessor: two point line', function(t) {
	var result = linelabel([{x: 0, y: 0},{x: 0, y: 1}], rad(1));
	t.segments(result, [ {
		length: 1,
		beginIndex: 0,
		beginDistance: 0,
		endIndex: 2,
		endDistance: 1,
		angles: [ null, null ] } ]);
	t.end();
});

tap.test('property accessor: simple straight line', function(t) {
	var result = linelabel([{x: 0, y: 0},{x: 1, y: 1},{x: 30, y: 30}], rad(1));
	t.segments(result, [ {
		length: 42.426406871192846,
		beginIndex: 0,
		beginDistance: 0,
		endIndex: 3,
		endDistance: 42.426406871192846,
		angles: [ null, 0, null ] } ]);
	t.end();
});

tap.test('property accessor: simple curved line', function(t) {
	var x = 0, y = 0, a = 0;
	var pts = [{x: x, y: y}];
	for (var i = 0, n = 10; i < n; i++) {
		a += rad(5);
		x += Math.cos(a) * 5;
		y += Math.sin(a) * 5;
		pts.push({x: x, y: y});
	}
	var result = linelabel(pts, rad(6));
	t.segments(result, [ {
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
	t.end();
});

tap.test('property accessor: invalid curved line', function(t) {
	var x = 0, y = 0, a = 0;
	var pts = [{x: x, y: y}];
	for (var i = 0, n = 3; i < n; i++) {
		a += rad(5);
		x += Math.cos(a) * 5;
		y += Math.sin(a) * 5;
		pts.push({x: x, y: y});
	}
	var result = linelabel(pts, rad(2));
	t.segments(result, [{
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
	t.end();
});
