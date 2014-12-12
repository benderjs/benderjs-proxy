var url = require( 'url' ),
	http = require( 'http' );

module.exports = {

	name: 'bender-proxy',

	attach: function () {
		var bender = this;

		bender.middlewares.push( function( bender ) {
			return function( req, res, next ) {
				var url_parts = url.parse( req.url );

				if ( url_parts.pathname.indexOf( '/ckfinder' ) === 0 ) {
					// Here we are going to map path to
					// http://localhost/ckfinder/core/connector/php/connector.php

					var opts;
					if (url_parts.pathname.indexOf( '/ckfinder-connector' ) === 0 ) {
						opts = url.parse( 'http://localhost/ckfinder/core/connector/php/connector.php' + url_parts.search );
					} else {
						opts = url.parse( 'http://localhost' + url_parts.path );
					}

					opts.method = req.method;
					opts.headers = req.headers;

					var destReq = http.request( opts, function( destRes ) {
						res.writeHead( destRes.statusCode, destRes.headers );
						destRes.pipe( res ); // pipe client to server response
					});
					req.pipe( destReq ); // pipe server to client request
				} else {
					next();
				}
			};

		} );
	}
};