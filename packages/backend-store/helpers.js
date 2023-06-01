import { STORE_NAME } from './constants';
import { useSelect, useDispatch } from '@wordpress/data';
import wpApiFetch from '@wordpress/api-fetch';

const WPMI_REST_ROUTES = qlwpmi_store_routes;

/**
 * Handle the response from the apiFetch
 *
 * @param {*} args
 * @returns response or error
 */
export async function apiFetch(args) {
	return await wpApiFetch(args)
		.then((response) => {
			if (!!response.code) {
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

export const fetchRestApiSettings = ({ method, data } = {}) => {
	return apiFetch({
		path: WPMI_REST_ROUTES.settings,
		method,
		data,
	});
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
