import { __, sprintf } from '@wordpress/i18n';
import { store as noticesStore } from '@wordpress/notices';
import {
	fetchRestApiDeleteLibrary,
	fetchRestApiLibrariesUpload,
	fetchRestApiSettings,
} from './helpers';

export const setLibraries = ( libraries ) => {
	return {
		type: 'SET_LIBRARIES',
		payload: libraries,
	};
};

export const uploadLibrary =
	( { body, headers } ) =>
	async ( { registry, dispatch, select } ) => {
		const response = await fetchRestApiLibrariesUpload( {
			method: 'POST',
			body,
			headers,
		} );

		if ( response?.code || response?.code === 0 ) {
			registry
				.dispatch( noticesStore )
				.createSuccessNotice(
					sprintf( '%1$s: %2$s', response.code, response.message ),
					{ type: 'snackbar' }
				);
			return false;
		}
		const libraries = select.getLibraries();

		const newLibrary = response;

		const i = libraries.findIndex(
			( library ) => library.name === newLibrary.name
		);

		libraries[ i ] = {
			...libraries[ i ],
			json_file_url: newLibrary.json_file_url,
			stylesheet_file_url: newLibrary.stylesheet_file_url,
			is_loaded: true,
		};

		dispatch.setLibraries( [ ...libraries ] );
		dispatch.setCurrentLibraryName( newLibrary.name );

		registry
			.dispatch( noticesStore )
			.createSuccessNotice(
				__(
					'The library has been created successfully.',
					'wp-menu-icons'
				),
				{ type: 'snackbar' }
			);

		return true;
	};

export const deleteLibrary =
	( libraryName ) =>
	async ( { registry, dispatch, select } ) => {
		const response = await fetchRestApiDeleteLibrary( libraryName );

		if ( response?.code ) {
			registry
				.dispatch( noticesStore )
				.createSuccessNotice(
					sprintf( '%1$s: %2$s', response.code, response.message ),
					{ type: 'snackbar' }
				);
			return false;
		}
		const libraries = select.getLibraries();

		const i = libraries.findIndex(
			( library ) => library.name === libraryName
		);

		libraries[ i ] = {
			...libraries[ i ],
			// stylesheet_file_url: false,
			stylesheet_file_url: false,
			json_url: false,
			is_loaded: false,
		};

		dispatch.setLibraries( [ ...libraries ] );

		registry
			.dispatch( noticesStore )
			.createSuccessNotice(
				sprintf(
					__( '%s succesfully deleted!', 'wp-menu-icons' ),
					libraries[ i ].label
				),
				{ type: 'snackbar' }
			);

		dispatch.setCurrentLibraryName( libraryName );

		return true;
	};

export const setCurrentLibraryName = ( libraryName ) => {
	return {
		type: 'SET_CURRENT_LIBRARY_NAME',
		payload: libraryName,
	};
};

export const setSettings = ( settings ) => {
	return {
		type: 'SET_SETTINGS',
		payload: settings,
	};
};

export const saveSettings =
	( settings ) =>
	async ( { registry, dispatch } ) => {
		const response = await fetchRestApiSettings( {
			method: 'POST',
			data: settings,
		} );

		if ( response?.code ) {
			registry
				.dispatch( noticesStore )
				.createSuccessNotice(
					sprintf( '%1$s: %2$s', response.code, response.message ),
					{ type: 'snackbar' }
				);
			return false;
		}

		dispatch.setSettings( {
			...settings,
		} );

		registry
			.dispatch( noticesStore )
			.createSuccessNotice( __( 'Settings saved.', 'wp-menu-icons' ), {
				type: 'snackbar',
			} );

		return true;
	};
