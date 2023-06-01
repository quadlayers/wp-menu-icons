/**
 * Internal dependencies
 */
import { fetchRestApiSettings } from './helpers';

import * as actions from './actions';

export const getSettings = async () => {
	try {
		const response = await fetchRestApiSettings();
		console.log('response: ', response);

		return actions.setSettings(response);
	} catch (error) {
		console.error(error);
	}
};
