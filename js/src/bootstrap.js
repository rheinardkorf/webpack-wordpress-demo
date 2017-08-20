module.exports = {
	ready: function( fn ) {
		if ( document.attachEvent ? 'complete' === document.readyState : 'loading' !== document.readyState ) {
			fn();
		} else {
			document.addEventListener( 'DOMContentLoaded', fn );
		}
	}
};
