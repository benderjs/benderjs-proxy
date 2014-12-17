var url = require( 'url' ),
	http = require( 'http' ),
	httpProxy = require( 'http-proxy' );

module.exports = {

	name: 'bender-proxy',

	attach: function() {
		var bender = this,
			proxy = httpProxy.createProxyServer( {
				changeOrigin: true
			} );

		bender.middlewares.unshift( function( bender ) {
			return function( req, res, next ) {
				var url_parts = url.parse( req.url );

				if ( url_parts.pathname.indexOf( '/ckfinder' ) === 0 ) {
					var target;
					if ( url_parts.pathname.indexOf( '/ckfinder-connector' ) === 0 ) {
						target = 'http://localhost/ckfinder/core/connector/php/connector.php' + url_parts.search;
					} else {
						target = 'http://localhost';
					}

					proxy.web( req, res, {
						target: target
					} );
				} else {
					next();
				}
			};
		} );
	}
};