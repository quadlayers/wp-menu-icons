import { combineReducers } from '@wordpress/data';

import { INITIAL_STATE } from './constants';

// export default function reducer(state = INITIAL_STATE, action) {
// 	switch (action.type) {
// 		case 'SET_LIBRARIES':
// 			return { ...state, libraries: action.payload };

// 		case 'SET_CURRENT_LIBRARY_NAME':
// 			return { ...state, currentLibraryName: action.payload };

// 		case 'SET_ACTIVE_LIBRARIES':
// 			return { ...state, activeLibraries: action.payload };
// 	}

// 	return state;
// }
export function setLibraries(state = INITIAL_STATE.settings, action) {
	switch (action.type) {
		case 'SET_LIBRARIES':
			return action.payload;
	}
	return state;
}

export function setCurrentLibraryName(state = INITIAL_STATE.settings, action) {
	switch (action.type) {
		case 'SET_CURRENT_LIBRARY_NAME':
			return action.payload;
	}
	return state;
}

export function settings(state = INITIAL_STATE.settings, action) {
	switch (action.type) {
		case 'SET_SETTINGS':
			return action.payload;
	}
	return state;
}

export default combineReducers({
	setLibraries,
	setCurrentLibraryName,
	settings,
});
