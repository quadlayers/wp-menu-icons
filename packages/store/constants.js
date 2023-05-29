export const STORE_NAME = 'wpmi/store';

const { WPMI_LIBRARIES } = wpmi_store;

export const INITIAL_STATE = {
	currentLibraryName: null,
	activeLibraries: [],
	libraries: WPMI_LIBRARIES,
};
