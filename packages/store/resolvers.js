/**
 * Internal dependencies
 */
import { fetchRestApiLibraries, fetchRestApiSettings } from './helpers';
import * as actions from './actions';

export const getLibraries = async () => {
	try {
		const response = await fetchRestApiLibraries();
		return actions.setLibraries(Object.values(response));
	} catch (error) {
		console.error(error);
	}
};

export const getActiveLibraries = async () => {
	try {
		const response = await fetchRestApiSettings();
		return actions.setActiveLibraries(Object.values(response));
	} catch (error) {
		console.error(error);
	}
};
