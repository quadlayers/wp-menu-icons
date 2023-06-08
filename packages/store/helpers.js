import wpApiFetch from '@wordpress/api-fetch';
import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
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
			// if (response.code) {
			// 	throw new Error(
			// 		`${response.code}: ${response?.message || 'Unknown'}`
			// 	);
			// }
			return response;
		})
		.catch((error) => {
			throw new Error(error);
		});
}

export const fetchRestApiLibraries = ({ method, data, headers } = {}) => {
	return apiFetch({
		path: WPMI_REST_ROUTES.libraries,
		method,
		data,
		headers,
	});
};

export const fetchRestApiLibrariesUpload = ({ method, body, headers } = {}) => {
	return apiFetch({
		path: WPMI_REST_ROUTES.libraries_upload,
		method,
		body,
		headers,
	});
};

export const fetchRestApiDeleteLibrary = (libraryName) => {
	return apiFetch({
		path: WPMI_REST_ROUTES.libraries + `?library_name=${libraryName}`,
		method: 'DELETE',
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
		path: WPMI_REST_ROUTES.navmenu + '?id=' + idMenu,
	});
};

const LinkStyleSheet = (() => {
	const link = document.createElement('link');
	link.rel = 'stylesheet';
	link.href = '';

	document.head.append(link);

	const setHref = (url) => (link.href = url);

	return {
		setHref,
	};
})();

export const getIcons = async (library) => {
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

export const useCurrentLibraryIconMap = () => {
	const [iconMap, setIconMap] = useState([]);
	const [isLoadingIconMap, setIsLoadingIconMap] = useState(false);

	const currentLibrary = useSelect((select) => {
		const { getCurrentLibrary } = select(STORE_NAME);

		return getCurrentLibrary();
	}, []);

	useEffect(() => {
		if (currentLibrary) {
			setIsLoadingIconMap(true);

			getIcons(currentLibrary).then((r) => {
				setIconMap(r);
				setIsLoadingIconMap(false);
			});
		} else {
			setIconMap([]);
		}
	}, [currentLibrary]);

	return {
		iconMap,
		isLoadingIconMap,
	};
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

	const { uploadLibrary, deleteLibrary } = useDispatch(STORE_NAME);

	return {
		libraries,
		isResolvingLibraries,
		hasResolvedLibraries,
		hasLibraries: !!(hasResolvedLibraries && libraries?.length),
		uploadLibrary,
		deleteLibrary,
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

		const idMenu = document.getElementById('menu')?.value;

		const currentLibraryName = getCurrentLibraryName(idMenu);
		const libraries = getLibraries();
		const currentLibrary = libraries.find(
			(library) => library.name == currentLibraryName
		);

		if (currentLibrary) {
			const { stylesheet_file_url } = currentLibrary;

			const url = stylesheet_file_url || '';

			LinkStyleSheet.setHref(url);
		}

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
