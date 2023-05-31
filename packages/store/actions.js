import { fetchRestApiSettings } from './helpers';

export const setLibraries = (libraries) => {
	return {
		type: 'SET_LIBRARIES',
		payload: libraries,
	};
};

export const setCurrentLibraryName = (libraryName) => {
	return {
		type: 'SET_CURRENT_LIBRARY_NAME',
		payload: libraryName,
	};
};

export const setActiveLibraries = (activeLibraries) => {
	return {
		type: 'SET_ACTIVE_LIBRARIES',
		payload: activeLibraries,
	};
};

export const saveSettings =
	(settings) =>
	async ({ dispatch }) => {
		await fetchRestApiSettings({
			method: 'POST',
			data: settings,
		});

		dispatch.setActiveLibraries({
			...settings,
		});

		return true;
	};
