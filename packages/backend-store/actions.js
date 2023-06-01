/**
 * WordPress dependencies
 */

import { __, sprintf } from '@wordpress/i18n';
import { store as noticesStore } from '@wordpress/notices';

/**
 * Internal dependencies
 */

import { fetchRestApiSettings } from './helpers';

export const setSettings = (settings) => {
	return {
		type: 'SET_SETTINGS',
		payload: settings,
	};
};

export const saveSettings =
	(settings) =>
	async ({ registry, dispatch }) => {
		const response = await fetchRestApiSettings({
			method: 'POST',
			data: settings,
		});

		if (!!response?.code) {
			registry
				.dispatch(noticesStore)
				.createSuccessNotice(
					sprintf('%s: %s', response.code, response.message),
					{ type: 'snackbar' }
				);
			return false;
		}

		dispatch.setSettings({
			...settings,
		});

		registry
			.dispatch(noticesStore)
			.createSuccessNotice(__('Settings saved.', 'wp-menu-icons'), {
				type: 'snackbar',
			});

		return true;
	};
