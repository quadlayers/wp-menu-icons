/**
 * Internal dependencies
 */
import { fetchRestApiLibrary } from "./helpers"

export const getLibrary = async () => {
	try {
		const responseApiFetch = await fetchRestApiLibrary()

		return actions.setLibrary(responseApiFetch);
	} catch (error) {
		console.error(error);
	}
};