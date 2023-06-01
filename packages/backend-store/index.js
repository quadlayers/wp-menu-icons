/**
 * WordPress dependencies
 */

import { createReduxStore, register } from "@wordpress/data";

/**
 * Internal dependencies
 */

import { STORE_NAME } from "./constants";

import reducer from "./reducer";
import * as actions from "./actions";
import * as selectors from "./selectors";
import * as resolvers from "./resolvers";

export const storeConfig = {
	reducer,
	actions,
	selectors,
	resolvers,
};

const store = createReduxStore(STORE_NAME, storeConfig);

register(store);

export * from "./helpers";
export * from "./constants";
export * as reducer from "./reducer";
export * as actions from "./actions";
export * as selectors from "./selectors";
export * as resolvers from "./resolvers";
