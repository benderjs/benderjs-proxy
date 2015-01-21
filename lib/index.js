var url = require( 'url' ),
	httpProxy = require( 'http-proxy' ),
	minimatch = require( 'minimatch' );

module.exports = {

	name: 'bender-proxy',

	attach: function() {
		var bender = this,
			proxy = httpProxy.createProxyServer( {
				changeOrigin: true
			} );

		bender.middlewares.add( function( bender ) {
			return function( req, res, next ) {
				var url_parts = url.parse( req.url ),
					config = bender.conf.proxy;

				if ( !config ) {
					return next();
				}

				var match = Object.keys( config ).some( function( from ) {
					var target = config[ from ];

					if ( minimatch( url_parts.pathname, from ) ) {
						if ( typeof target === 'function' ) {
							target = target( url_parts );
						}

						proxy.web( req, res, {
							target: target
						} );

						return true;
					}
				} );

				if ( !match ) {
					next();
				}
			};
		}, -10 );
	}
};
