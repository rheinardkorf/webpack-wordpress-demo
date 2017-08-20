import '../../css/src/style.scss';
import bootstrap from './bootstrap';

bootstrap.ready( function() {

	var demoDiv = document.getElementById( 'demo-plugin-item' );
	demoDiv.appendChild( document.createTextNode( '### This worked! ###' ) );
});
