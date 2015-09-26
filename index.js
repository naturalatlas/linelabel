/* (DONT EDIT THIS FILE) see template.js instead */

/* array accessor style (default) */
module.exports = function (pts, max_angle_delta) {
	var chunks = [];
	var cur_angles = [null];
	var a, b, c, i = 0, n = 0, d = 0;
	var abmag = 0, bcmag = 0;
	var abx = 0, aby = 0;
	var bcx = 0, bcy = 0;
	var dt = 0;
	var i_start = 0;
	var d_start = 0;

	if (pts.length < 2) return [];
	if (pts.length === 2) {
		d = Math.sqrt(
			Math.pow(pts[1][0] - pts[0][0], 2) +
			Math.pow(pts[1][1] - pts[0][1], 2));

		return [{
			length: d,
			beginIndex: 0,
			beginDistance: 0,
			endIndex: 2,
			endDistance: d,
			angles: [null, null]
		}];
	}

	abmag = Math.sqrt(Math.pow(pts[1][0] - pts[0][0], 2) + Math.pow(pts[1][1] - pts[0][1], 2));
	for (i = 1, n = pts.length - 1; i < n; i++) {
		a = pts[i - 1];
		b = pts[i];
		c = pts[i + 1];
		abx = b[0] - a[0];
		aby = b[1] - a[1];
		bcx = c[0] - b[0];
		bcy = c[1] - b[1];
		bcmag = Math.sqrt(bcx * bcx + bcy * bcy);
		d += abmag;

		dt = Math.acos((abx * bcx + aby * bcy) / (abmag * bcmag));
		cur_angles.push(dt);
		if (dt > max_angle_delta) {
			chunks.push({
				length: d - d_start,
				beginDistance: d_start,
				beginIndex: i_start,
				endIndex: i + 1,
				endDistance: d,
				angles: cur_angles
			});
			i_start = i;
			d_start = d;
			cur_angles = [dt];
		}
		abmag = bcmag;
	}

	cur_angles.push(null);
	if (i - i_start > 0) {
		chunks.push({
			length: d - d_start + bcmag,
			beginIndex: i_start,
			beginDistance: d_start,
			endIndex: i + 1,
			endDistance: d + bcmag,
			angles: cur_angles
		});
	}
	return chunks;
}