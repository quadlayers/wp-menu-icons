import { __, sprintf } from '@wordpress/i18n';
import { store as noticesStore } from '@wordpress/notices';
import {
	fetchRestApiDeleteLibrary,
	fetchRestApiLibraries,
	fetchRestApiLibrariesUpload,
	fetchRestApiSettings,
} from './helpers';

export const setLibraries = (libraries) => {
	return {
		type: 'SET_LIBRARIES',
		payload: libraries,
	};
};

export const getIcons =
	(library) =>
	async ({ registry, dispatch, select, resolveSelect }) => {
		if (library.iconmap) {
			return library.iconmap.split(',');
		} else if (library.json_file_url) {
			const response = await fetch(
				new Request(library.json_file_url, { cache: 'no-store' })
			);

			if (!response.ok) {
				return [];
			}

			const data = await response.json();

			if (data.IcoMoonType) {
				const prefix = 'icomoon-';
				const icons = data.icons.map(
					(icon) => prefix + icon.properties.name
				);

				return icons;
			} else {
				const prefix = 'fontello-icon-';
				const icons = data.glyphs.map((item) => prefix + item.css);

				return icons;
			}
		} else {
			return [];
		}
	};

export const uploadLibrary =
	({ body, headers }) =>
	async ({ registry, dispatch, select, resolveSelect }) => {
		const libraries = select.getLibraries();

		const response = await fetchRestApiLibrariesUpload({
			method: 'POST',
			body,
			headers,
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

		const newLibrary = response;

		const i = libraries.findIndex(
			(library) => library.name === newLibrary.name
		);

		libraries[i] = {
			...libraries[i],
			json_file_url: newLibrary.json_url,
			stylesheet_file_url: newLibrary.stylesheet_url,
		};

		dispatch.setLibraries([...libraries]);
		dispatch.setCurrentLibraryName(newLibrary.name);

		registry
			.dispatch(noticesStore)
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
	(libraryName) =>
	async ({ registry, dispatch, select, resolveSelect }) => {
		const libraries = select.getLibraries();

		const response = await fetchRestApiDeleteLibrary(libraryName);

		if (response?.code) {
			registry
				.dispatch(noticesStore)
				.createSuccessNotice(
					sprintf(__('%s: %s'), response.code, response.message),
					{ type: 'snackbar' }
				);
			return false;
		}

		const i = libraries.findIndex(
			(library) => library.name === libraryName
		);

		libraries[i] = {
			...libraries[i],
			stylesheet_url: false,
			stylesheet_file: false,
			json_url: false,
		};

		dispatch.setLibraries([...libraries]);

		registry
			.dispatch(noticesStore)
			.createSuccessNotice(
				sprintf(__('%s succesfully deleted!'), libraries[i].label),
				{ type: 'snackbar' }
			);

		dispatch.setCurrentLibraryName(libraryName);

		return true;
	};

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
