/**
 * WordPress dependencies
 */
import { combineReducers } from '@wordpress/data';

/**
 * Internal dependencies
 */

import { INITIAL_STATE } from './constants';

export function settings(state = INITIAL_STATE.settings, action) {
	switch (action.type) {
		case 'SET_SETTINGS':
			return action.payload;
	}
	return state;
}

export default combineReducers({
	settings,
});
