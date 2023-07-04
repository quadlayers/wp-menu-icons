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
		return actions.setLibraries( Object.values( response ) );
	} catch ( error ) {
		// eslint-disable-next-line
		console.error( error );
	}
};

export const getSettings = async () => {
	try {
		const response = await fetchRestApiSettings();

		return actions.setSettings( response );
	} catch ( error ) {
		// eslint-disable-next-line
		console.error( error );
	}
};

export const getCurrentLibraryName = async ( idMenu ) => {
	try {
		const response = await fetchRestApiMenu( idMenu );
		return actions.setCurrentLibraryName( response );
	} catch ( error ) {
		// eslint-disable-next-line
		console.error( error );
	}
};
