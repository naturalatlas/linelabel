# linelabel
[![NPM version](http://img.shields.io/npm/v/linelabel.svg?style=flat)](https://www.npmjs.org/package/linelabel)
[![Build Status](http://img.shields.io/travis/naturalatlas/linelabel/master.svg?style=flat)](https://travis-ci.org/naturalatlas/linelabel)
[![Coverage Status](http://img.shields.io/codecov/c/github/naturalatlas/linelabel/master.svg?style=flat)](https://codecov.io/github/naturalatlas/linelabel)

A simple, no-dependency library for breaking a path into chunks that have a desired level of straightness (defined by max curvature). The main use for this is text labeling in SVGs and web maps.

<img src="https://cdn.rawgit.com/naturalatlas/linelabel/master/misc/output.svg" width="760" />

```sh
$ npm install linelabel --save
```

For performance reasons, the package comes with two variations of the same function:

```js
// if your coordinates look like this: [0, 0]
var linelabel = require('linelabel');

// if your coordinates look like this: {x: 0, y: 0}
var linelabel = require('linelabel/xy');
```

### Usage

```js
var segments = linelabel(pts, max_angle);
```

The `max_angle` argument represents the maximum angle delta to allow between three points (in radians). If the angle differs more than the given amount, the current chunk will be ended and a new one will start. The output will be an array of segments, each looking like:

```js
{
	length: <number>,
	beginIndex: <number>,
	beginDistance: <number>,
	endIndex: <number>,
	endDistance: <number>,
	angles: <number[]> /* curvature at each point in the segment */
}
```

## Contributing

Before submitting pull requests, please update the [tests](test) and make sure they all pass.

```sh
$ npm test
```

## License

Copyright &copy; 2015 [Natural Atlas, Inc.](https://github.com/naturalatlas) & [Contributors](https://github.com/naturalatlas/linelabel/graphs/contributors)

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at: http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
