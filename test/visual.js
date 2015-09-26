var fs = require('fs');
var xml2js = require('xml2js');
var linelabel = require('../index.js');
var builder = new xml2js.Builder();

function d(coords) {
	if (!coords || coords.length < 2) return '';
	var parts = ['M' + coords[0][0] + ' ' + coords[0][1]];
	for (var i = 1, n = coords.length; i < n; i++) {
		parts.push(['L' + coords[i][0] + ' ' + coords[i][1]]);
	}
	return parts.join(' ');
}

xml2js.parseString(fs.readFileSync(__dirname + '/in.svg', 'utf8'), function(err, svg) {
	if (err) throw err;
	var index = 0;

	var g_result      = {$: {id: 'output'}};
	var g_angles      = {$: {id: 'angles'}};
	var g_labels      = {$: {id: 'labels'}};
	svg.svg.g         = [g_result, g_angles, g_labels];

	var output_paths  = g_result.path = [];
	var output_pts    = g_result.circle = [];
	var output_angles = g_angles.text = [];
	var output_text   = g_labels.text = [];

	var min_length = 200;
	var max_angle = 44;

	svg.svg.text = [
		{_: 'Min Length = ' + min_length + 'px', $: {x: 3, y: 10, 'font-family': 'Arial', 'font-size': 10, 'alignment-baseline': 'top', 'align': 'left'}},
		{_: 'Max Angle = ' + max_angle + '°', $: {x: 3, y: 22, 'font-family': 'Arial', 'font-size': 10, 'alignment-baseline': 'top', 'align': 'left'}},
	];

	svg.svg.polyline.forEach(function(polyline) {
		var fontSize = 12;

		// polyline -> [x,y] points
		var pts = polyline.$.points.trim().split(/\s+/).map(function(pt) {
			return pt.trim().split(/\s*,\s*/).map(Number);
		});

		//
		// Display Vertices
		//

		pts.forEach(function(pt) {
			output_pts.push({$: {r:2, fill: '#000000', cx: pt[0], cy: pt[1]}});
			output_pts.push({$: {r:1, fill: '#ffffff', cx: pt[0], cy: pt[1]}});
		});

		//
		// Computed Segments
		//

		var segments = linelabel(pts, max_angle/360*Math.PI*2);
		segments.forEach(function(segment) {
			if (segment.length < min_length) return;
			var id = 'line' + (++index);
			var label = 'd = ' + Math.round(segment.length*100)/100;

			var segmentpts = pts.slice(segment.beginIndex, segment.endIndex);

			// segment label
			output_paths.push({$: {d: d(segmentpts), fill: 'none', stroke: '#00FF00', 'stroke-width': 4, 'stroke-dasharray': '2,2', id: id}});
			output_text.push({
				textPath: [
					{$: {
						'font-size': fontSize,
						'font-family': 'Arial',
						'stroke-width': 8,
						'stroke': '#fff',
						'startOffset': '50%',
						'text-anchor': 'middle',
						'alignment-baseline': 'middle',
						'xlink:href': '#' + id
					}, _: label}
				]
			});
			output_text.push({
				textPath: [
					{$: {
						'font-size': fontSize,
						'font-family': 'Arial',
						'startOffset': '50%',
						'text-anchor': 'middle',
						'alignment-baseline': 'middle',
						'xlink:href': '#' + id
					}, _: label}
				]
			});

			// segment start point
			output_pts.push({$: {r:4, fill: '#008000', cx: pts[segment.beginIndex][0], cy: pts[segment.beginIndex][1]}});
			output_pts.push({$: {r:2, fill: '#ffffff', cx: pts[segment.beginIndex][0], cy: pts[segment.beginIndex][1]}});

			// segment end point
			output_pts.push({$: {r:4, fill: '#008000', cx: pts[segment.endIndex-1][0], cy: pts[segment.endIndex-1][1]}});
			output_pts.push({$: {r:2, fill: '#ffffff', cx: pts[segment.endIndex-1][0], cy: pts[segment.endIndex-1][1]}});

			// segment midpoint angles
			segment.angles.forEach(function(radians, i) {
				if (radians === null) return;
				output_angles.push({$: {x: pts[segment.beginIndex+i][0], y: pts[segment.beginIndex+i][1]+14, 'stroke-width': 2, 'stroke': '#ffffff', 'font-family': 'Arial', 'font-size': 9}, _: Math.round(radians/(Math.PI*2)*360)+'°'});
				output_angles.push({$: {x: pts[segment.beginIndex+i][0], y: pts[segment.beginIndex+i][1]+14, 'font-family': 'Arial', 'font-size': 9}, _: Math.round(radians/(Math.PI*2)*360)+'°'});
			});
		});

	});


	var out = builder.buildObject(svg);
	fs.writeFileSync(__dirname + '/out.svg', out, 'utf8');
});
