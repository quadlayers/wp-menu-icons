/**
 * WordPress dependencies
 */

import { render } from "@wordpress/element";
import App  from "./app";
import { onDocumentLoaded } from "./helpers";

onDocumentLoaded(() => {
	const container = document.createElement('div')
	const body = document.querySelector('body')

	body.append(container)

	const metabox = document.getElementById('wpmi_metabox')

	metabox.addEventListener('click', e => {
		const menu_font = metabox.querySelector('input:checked').value
		const menu_id = document.getElementById('menu').value

		if (e.target.classList.contains('save') && menu_font && menu_id) {
			e.preventDefault()

			const data = {
				action: 'wpmi_save_nav_menu',
				menu_font,
				menu_id,
				nonce: wpmi_l10n.nonce
			}

			fetch(ajaxurl, {
				method: 'POST',
				headers: {
				  'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			})
			.then(function(response) {
				return response.json();
			})
			.then(function(data) {
				//location.reload()
			})
			.catch(function(error) {
				alert('Error!')
			});
		}
	})

	render(<App />, container);
});
