import { INITIAL_STATE } from './constants';

export default function reducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case 'SET_LIBRARIES':
			return { ...state, libraries: action.payload };

		case 'SET_CURRENT_LIBRARY_NAME':
			return { ...state, currentLibraryName: action.payload };

		// case "SET_ACTIVE_LIBRERIES":
		//    return { ...state, activeLibrary: action.payload };
	}

	return state;
}
