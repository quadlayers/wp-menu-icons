export const setLibraries = (libraries) => {
	return {
		type: 'SET_LIBRARIES',
		payload: libraries,
	};
};

export const setCurrentLibraryName = (libraryName) => {
	return {
		type: 'SET_CURRENT_LIBRARY_NAME',
		payload: libraryName,
	};
};

// export const setActiveLibreries = libreries => {
//     return {
//         type: "SET_ACTIVE_LIBRERIES",
//         payload: libreries
//     }
// }
