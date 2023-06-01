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

	/*
	const metabox = document.getElementById('wpmi_metabox')

	metabox.addEventListener('click', e => {
		const menu_font = metabox.querySelector('input:checked').value
		const menu_id = document.getElementById('menu').value

		if (e.target.classList.contains('save') && menu_font && menu_id) {
			e.preventDefault()

			fetch(ajaxurl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: new URLSearchParams({
					action: 'wpmi_save_nav_menu',
					menu_id: menu_id,
					menu_font: menu_font,
					nonce: wpmi_backend.nonce
				})
			}).then(response => {
				if (!response.ok) {
					throw new Error("HTTP error " + response.status);
				}
				return response.text();
			}).then(data => {
				location.reload();
			}).catch(function() {
				alert('Error!');
			});

		}
	})
	*/

	const metabox_container = document.getElementById(
		`posttype-${WPMI_PREFIX}-themes`
	);

	render(<App />, container);
	render(<MetaBox />, metabox_container);
});
