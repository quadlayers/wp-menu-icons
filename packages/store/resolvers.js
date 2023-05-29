/**
 * Internal dependencies
 */
import { fetchRestApiLibraries } from "./helpers"
import * as actions from "./actions"

const {
	WPMI_LIBRARIES
} = wpmi_store

export const getLibraries = async () => {
	try {
		return Object.keys(WPMI_LIBRARIES).map(id => WPMI_LIBRARIES[id])

		//const response = await fetchRestApiLibraries();
		//return actions.setLibraries(response)
	} catch (error) {
		console.error(error)
	}
};
	