import { __, sprintf } from '@wordpress/i18n';
import { store as noticesStore } from '@wordpress/notices';
import { fetchRestApiLibraries, fetchRestApiSettings } from './helpers';

export const setLibraries = (libraries) => {
	return {
		type: 'SET_LIBRARIES',
		payload: libraries,
	};
};

export const createLibrary =
	({data, headers}) =>
	async ({ registry, dispatch, select, resolveSelect }) => {
		const libraries = select.getLibraries();

		const response = await fetchRestApiLibraries({
			method: 'POST',
			//TODO: replace with file
			data,
			//TODO: check if headers is neccesary
			headers
		});

		if (response?.code) {
			registry
				.dispatch(noticesStore)
				.createSuccessNotice(
					sprintf(__('%s: %s'), response.code, response.message),
					{ type: 'snackbar' }
				);
			return false;
		}

		//TODO: valida if is a valida library {name,label,...}

		libraries.push(response);

		dispatch.setLibraries([...libraries]);

		registry
			.dispatch(noticesStore)
			.createSuccessNotice(
				__('The library has been created successfully.', 'wp-menu-icons'),
				{ type: 'snackbar' }
			);

		return true;
	};

//TODO: deleteLibrary

export const setCurrentLibraryName = (libraryName) => {
	return {
		type: 'SET_CURRENT_LIBRARY_NAME',
		payload: libraryName,
	};
};

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

		if (response?.code) {
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
