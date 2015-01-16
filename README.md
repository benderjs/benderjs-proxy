# benderjs-proxy

HTTP proxy for Bender.js using [node-http-proxy](https://github.com/nodejitsu/node-http-proxy). Especially useful for testing Cross-Origin requests.

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
    (...)

	proxy: {
		// Below configuration will redirect all requests from http://<bender_host>:<bender_port>/google to http://google.com
		'/google': 'http://google.com',
		
        // You can also pass a function as a proxy target, it will receive a URL object produced using Node's url.parse() method
		'/foobar': function( url ) {
			return 'http://example.com/foo/bar' + ( url.search || '' );
		}
	}
};

module.exports = config;
```

## License

MIT, for license details see: [LICENSE.md](https://github.com/benderjs/benderjs-jquery/blob/master/LICENSE.md).
