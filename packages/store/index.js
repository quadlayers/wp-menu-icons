/**
 * External dependencies
 */
import { createReduxStore, register } from '@wordpress/data'

/**
 * Internal dependencies
 */
import { STORE_NAME } from './constants'
import * as selectors from './selectors'
import * as actions from './actions'
import * as resolvers from './resolvers'
import reducer from './reducer'

const store = createReduxStore(STORE_NAME, {
    reducer,
    actions,
    selectors,
    resolvers
})

register(store)

export const WPMI_STORE_NAME = STORE_NAME