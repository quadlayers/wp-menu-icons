/**
 * Internal dependencies
 */
import { fetchRestApiLibraries } from './helpers';
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
		// TODO: support
	} catch (error) {
		console.error(error);
	}
};
