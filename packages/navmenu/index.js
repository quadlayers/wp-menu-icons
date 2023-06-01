/**
 * WordPress dependencies
 */

import { render } from '@wordpress/element';

import App from './app';
import MetaBox from './components/metabox';

import { onDocumentLoaded } from './helpers';

const { WPMI_PREFIX } = wpmi_navmenu;

onDocumentLoaded(() => {
	const container = document.createElement('div');
	const body = document.querySelector('body');

	body.append(container);

	const metabox_container = document.getElementById(
		`posttype-${WPMI_PREFIX}-themes`
	);

	render(<App />, container);
	render(<MetaBox />, metabox_container);
});
