/**
 * WordPress dependencies
 */

import { render } from '@wordpress/element';
import { App } from './app';
import { onDocumentLoaded } from './helpers';

onDocumentLoaded(() => {
	const target = document.getElementById('wpbody-content');
	render(<App />, target);
});
