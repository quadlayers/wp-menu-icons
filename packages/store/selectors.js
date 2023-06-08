export const getLibraries = (state) => {
	return state.libraries;
};

export const getCurrentLibraryName = (state) => {
	return state.currentLibraryName;
};

export const getCurrentLibrary = state => {
	const { libraries, currentLibraryName } = state
	const currentLibrary = libraries.find(library => library.name == currentLibraryName)

	return currentLibrary
}

export const getSettings = (state) => {
	return state.settings;
};