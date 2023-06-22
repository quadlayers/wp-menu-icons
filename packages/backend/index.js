/**
 * WordPress dependencies
 */

import { render } from '@wordpress/element';
import { App } from './app';
import { onDocumentLoaded } from './helpers';
export * from './app';
export * from './components';
export * from './helpers';

onDocumentLoaded(() => {
	const target = document.getElementById('wpbody-content');
	render(<App />, target);
});
