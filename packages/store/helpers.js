import wpApiFetch from '@wordpress/api-fetch';
import { useSelect, useDispatch } from '@wordpress/data';
import { WPMI_STORE_NAME } from '.';

const { WPMI_REST_ROUTES } = wpmi_backend;

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

export const fetchRestApiLibrary = ({ method, data } = {}) => {
	return apiFetch({
		path: WPMI_REST_ROUTES.library,
		method,
		data,
	});
};

export const useLibrary = (libraryName) => {
	const { library, isResolvingLibrary, hasResolvedLibrary } = useSelect(
		(select) => {
			const { getLibrary, isResolving, hasFinishedResolution } =
				select(WPMI_STORE_NAME);

			return {
				library: getLibrary(libraryName),
				isResolvingLibrary: isResolving('getLibrary'),
				hasResolvedLibrary: hasFinishedResolution('getLibrary'),
			};
		},
		[]
	);

	return {
		library,
		isResolvingLibrary,
		hasResolvedLibrary,
		hasLibrary: !!(hasResolvedLibrary && library?.length),
	};
};

export const useCurrentLibrary = () => {
	const {
		currentLibrary,
		currentLibraryName,
		isResolving,
		hasResolvedCurrentLibraryName,
	} = useSelect((select) => {
		const {
			getCurrentLibraryName,
			getLibraries,
			isResolving,
			hasFinishedResolution,
		} = select(WPMI_STORE_NAME);

		const currentLibraryName = getCurrentLibraryName();
		const libraries = getLibraries();

		const currentLibrary = libraries.find(
			(library) => library.name === currentLibraryName
		);

		return {
			currentLibrary,
			currentLibraryName,
			isResolving,
			hasResolvedCurrentLibraryName: hasFinishedResolution(
				'getCurrentLibraryName'
			),
		};
	}, []);

	const { setCurrentLibraryName } = useDispatch(WPMI_STORE_NAME);

	return {
		currentLibrary,
		currentLibraryName,
		setCurrentLibraryName,
		isResolving,
		hasResolvedCurrentLibraryName,
	};
};
