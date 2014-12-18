# benderjs-proxy

[node-http-proxy](https://github.com/nodejitsu/node-http-proxy) wrapper for bender. Especially useful for Cross-Origin testing with bender.

## Installation

```
npm install benderjs-proxy
```

## Usage

Add `benderjs-proxy` to the `plugins` array in your `bender.js` configuration file:

```javascript
var config = {
	plugins: [ 'benderjs-proxy' ] // load the plugin
};

module.exports = config;
```

## Configuration

You can configure proxy in `bender.js` configuration file.
```javascript
var config = {
	proxy: {
		// Below option will redirect all requests from http://127.0.0.1:1030/google to http://google.com
		'/google': 'http://google.com'
	}
};

module.exports = config;
```

## License

MIT, for license details see: [LICENSE.md](https://github.com/benderjs/benderjs-jquery/blob/master/LICENSE.md).
