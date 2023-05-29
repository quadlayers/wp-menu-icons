export const STORE_NAME = 'wpmi/store';

const { WPMI_LIBRARIES } = wpmi_store;

export const INITIAL_STATE = {
	currentLibraryName: null,
	activeLibraries: [],
	libraries: Object.values(WPMI_LIBRARIES || {}),
	// libraries: Object.keys(WPMI_LIBRARIES).map(id => WPMI_LIBRARIES[id])
};
