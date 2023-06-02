/**
 * Internal dependencies
 */
import {
	fetchRestApiLibraries,
	fetchRestApiSettings,
	fetchRestApiMenu,
} from './helpers';
import * as actions from './actions';

export const getLibraries = async () => {
	try {
		const response = await fetchRestApiLibraries();
		return actions.setLibraries(Object.values(response));
	} catch (error) {
		console.error(error);
	}
};

export const createLibrary = async ({ data, headers }) => {
	try {
		const response = await fetchRestApiLibraries({
			method: 'POST',
			data,
			headers,
		});
		//TODO: check if the response is ok and include library in libraries
		return actions.setLibraries();
	} catch (error) {
		console.error(error);
	}
};

export const deleteLibrary = async () => {
	try {
		const response = await fetchRestApiLibraries({
			method: 'DELETE',
			data: { name: 'test' },
		});
		//TODO: check if the response is ok and remove library from libraries
		// return actions.setLibraries(Object.values(response));
	} catch (error) {
		console.error(error);
	}
};

export const getSettings = async () => {
	try {
		const response = await fetchRestApiSettings();
		// console.log('response: ', response);

		return actions.setSettings(response);
	} catch (error) {
		console.error(error);
	}
};

export const getCurrentLibraryName = async (idMenu) => {
	try {
		const response = await fetchRestApiMenu(idMenu);
		return actions.setCurrentLibraryName(response);
	} catch (error) {
		console.error(error);
	}
};
