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

		bender.middlewares.unshift( function( bender ) {

			return function( req, res, next ) {
				var url_parts = url.parse( req.url ),
					match = false;

				for ( var from in bender.conf.proxy ) {
					var target = bender.conf.proxy[ from ];

					if ( minimatch( url_parts.pathname, from ) !== false ) {
						match = true;

						if ( typeof target === 'function' ) {
							target = target( url_parts );
						}

						proxy.web( req, res, {
							target: target
						} );

						break;
					}
				}

				if ( !match ) {
					next();
				}
			};
		} );
	}
};