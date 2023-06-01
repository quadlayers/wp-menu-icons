import wpApiFetch from '@wordpress/api-fetch';
import { useSelect, useDispatch } from '@wordpress/data';
import { STORE_NAME } from './constants';
// eslint-disable-next-line no-undef
const { WPMI_REST_ROUTES } = wpmi_store;
/**
 * Handle the response from the apiFetch
 *
 * @param {*} args
 * @returns response or error
 */
export async function apiFetch(args) {
	return await wpApiFetch(args)
		.then((response) => {
			if (response.code) {
				throw new Error(
					`${response.code}: ${response?.message || 'Unknown'}`
				);
			}
			return response;
		})
		.catch((error) => {
			throw new Error(error);
		});
}

export const fetchRestApiLibraries = ({ method, data } = {}) => {
	return apiFetch({
		path: WPMI_REST_ROUTES.libraries,
		method,
		data,
	});
};

export const fetchRestApiSettings = ({ method, data } = {}) => {
	return apiFetch({
		path: WPMI_REST_ROUTES.settings,
		method,
		data,
	});
};

export const fetchRestApiMenu = (idMenu) => {
	return apiFetch({
		path: WPMI_REST_ROUTES.menu + '?id=' + idMenu,
	});
};

export const useLibraries = () => {
	const { libraries, isResolvingLibraries, hasResolvedLibraries } = useSelect(
		(select) => {
			const { getLibraries, isResolving, hasFinishedResolution } =
				select(STORE_NAME);

			return {
				libraries: getLibraries(),
				isResolvingLibraries: isResolving('getLibraries'),
				hasResolvedLibraries: hasFinishedResolution('getLibraries'),
			};
		},
		[]
	);

	return {
		libraries,
		isResolvingLibraries,
		hasResolvedLibraries,
		hasLibraries: !!(hasResolvedLibraries && libraries?.length),
	};
};

export const useCurrentLibrary = () => {
	const {
		currentLibrary,
		currentLibraryName,
		isResolvingCurrentLibrary,
		hasResolvedCurrentLibrary,
	} = useSelect((select) => {
		const {
			getCurrentLibraryName,
			getLibraries,
			isResolvingCurrentLibrary,
			hasFinishedResolution,
		} = select(STORE_NAME);

		const idMenu = document.getElementById('menu').value;

		const currentLibraryName = getCurrentLibraryName(idMenu);
		const libraries = getLibraries();
		const currentLibrary = libraries.find(
			(library) => library.name == currentLibraryName
		);

		return {
			currentLibrary,
			currentLibraryName,
			isResolvingCurrentLibrary,
			hasResolvedCurrentLibraryName: hasFinishedResolution(
				'getCurrentLibraryName'
			),
		};
	}, []);

	const { setCurrentLibraryName } = useDispatch(STORE_NAME);

	return {
		currentLibrary,
		currentLibraryName,
		setCurrentLibraryName,
		isResolvingCurrentLibrary,
		hasResolvedCurrentLibrary,
	};
};

export function useSettingsEntities() {
	const { saveSettings, setSettings } = useDispatch(STORE_NAME);

	const { settings, isResolvingSettings, hasResolvedSettings } = useSelect(
		(select) => {
			const { isResolving, hasFinishedResolution, getSettings } =
				select(STORE_NAME);

			return {
				settings: getSettings(),
				isResolvingSettings: isResolving('getSettings'),
				hasResolvedSettings: hasFinishedResolution('getSettings'),
			};
		},
		[]
	);

	return {
		settings,
		isResolvingSettings,
		hasResolvedSettings,
		hasSettings: !!(hasResolvedSettings && Object.keys(settings)?.length),
		saveSettings,
		setSettings,
	};
}
