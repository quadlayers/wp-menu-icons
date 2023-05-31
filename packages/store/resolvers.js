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

export const uploadLibrary = async () => {
	try {
		const response = await fetchRestApiLibraries();

		//TODO: check if the response is ok and include library in libraries
		// return actions.setLibraries(Object.values(response));
	} catch (error) {
		console.error(error);
	}
};

export const deleteLibraries = async () => {
	try {
		const response = await fetchRestApiLibraries();
		//TODO: check if the response is ok and remove library from libraries
		// return actions.setLibraries(Object.values(response));
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

export const getCurrentLibraryName = async (menu_id) => {
	try {
		//TODO: implement resolver
		// const response = await fetchRestApiMenu(menu_id);
		// return actions.setCurrentLibraryName(...);
	} catch (error) {
		console.error(error);
	}
};
