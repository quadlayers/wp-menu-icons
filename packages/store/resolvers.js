/**
 * Internal dependencies
 */
import { fetchRestApiLibraries } from "./helpers"
import * as actions from "./actions"

export const getLibraries = async () => {
	try {
		const response = await fetchRestApiLibraries();
		return actions.setLibraries(response)
	} catch (error) {
		console.error(error)
	}
};
	