/**
 * External dependencies
 */
import { createReduxStore, register } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { STORE_NAME } from './constants';
import * as selectors from './selectors';
import * as actions from './actions';
import * as resolvers from './resolvers';
import reducer from './reducer';
import './helpers';

const store = createReduxStore(STORE_NAME, {
	reducer,
	actions,
	selectors,
	resolvers,
});

register(store);

export const WPMI_STORE_NAME = STORE_NAME;
export * from './helpers';
export * from './constants';
export * as reducer from './reducer';
export * as actions from './actions';
export * as selectors from './selectors';
export * as resolvers from './resolvers';
