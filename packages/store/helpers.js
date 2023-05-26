import wpApiFetch from '@wordpress/api-fetch';
import { useSelect, useDispatch } from '@wordpress/data';
import { WPMI_STORE_NAME } from '.';

// const { WPMI_REST_ROUTES } = wpmi_store;

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
		path: '',
		method,
		data,
	});
};

export const useLibraries = () => {
	const { libraries, isResolvingLibraries, hasResolvedLibraries } = useSelect(
		(select) => {
			const { getLibraries, isResolving, hasFinishedResolution } =
				select(WPMI_STORE_NAME);

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
		} = select(WPMI_STORE_NAME);

		const currentLibraryName = getCurrentLibraryName();
		const libraries = getLibraries();

		const currentLibrary = libraries.find(
			(library) => library.name === currentLibraryName
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

	const { setCurrentLibraryName } = useDispatch(WPMI_STORE_NAME);

	return {
		currentLibrary,
		currentLibraryName,
		setCurrentLibraryName,
		isResolvingCurrentLibrary,
		hasResolvedCurrentLibrary,
	};
};
