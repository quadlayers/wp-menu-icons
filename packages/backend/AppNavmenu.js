/**
 * WordPress dependencies
 */

import { render } from '@wordpress/element';

import NavMenu from './app/NavMenu';
import MetaBox from './components/metabox';

import { onDocumentLoaded } from './helpers';

const { WPMI_PREFIX } = wpmi_backend;

onDocumentLoaded(() => {
	const container = document.createElement('div');
	const body = document.querySelector('body');

	const isNavmenu = body.classList.contains('nav-menus-php');
	body.append(container);

	const metabox_container = document.getElementById(
		`posttype-${WPMI_PREFIX}-themes`
	);

	if (isNavmenu) {
		render(<NavMenu />, container);
		render(<MetaBox />, metabox_container);
	}
});

//import '/backend/menu'; => isBackend
//import '/backend/navmenu'; => isNavmenu
