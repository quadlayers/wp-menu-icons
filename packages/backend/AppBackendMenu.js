/**
 * WordPress dependencies
 */

import { render } from '@wordpress/element';
import BackendMenu from './app/BackendMenu';
import { onDocumentLoaded } from './helpers';

onDocumentLoaded(() => {
	const container = document.createElement('div');
	const target = document.getElementById('wpbody-content');

	const body = document.querySelector('body');

	const isBackend = body.classList.contains('toplevel_page_wp-menu-icons');

	body.append(container);

	if (isBackend) {
		render(<BackendMenu />, target);
	}
});
