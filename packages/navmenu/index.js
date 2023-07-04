/**
 * WordPress dependencies
 */

import { render } from '@wordpress/element';

import App from './app';
import MetaBox from './metabox';

import { onDocumentLoaded } from './helpers';

// eslint-disable-next-line
const { WPMI_PREFIX } = wpmi_navmenu;

onDocumentLoaded( () => {
	const app = document.createElement( 'div' );
	const body = document.querySelector( 'body' );

	body.append( app );

	const metabox = document.getElementById(
		`posttype-${ WPMI_PREFIX }-themes`
	);

	if ( app ) {
		render( <App />, app );
	}

	if ( metabox ) {
		render( <MetaBox />, metabox );
	}
} );
